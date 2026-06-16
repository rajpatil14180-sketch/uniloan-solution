import { google, sheets_v4 } from "googleapis";
import type { Lead } from "./types";

// Maps creator source values to their dedicated Google Sheets tab name.
// Add an entry here whenever a new creator is added in src/lib/creators.ts.
const CREATOR_TABS: Record<string, string> = {
  "creator-pooja-maske": "Pooja Referral",
};

// Eligibility lead columns are reused for every creator tab
const ELIGIBILITY_COLUMNS = [
  "ID", "Date", "Status", "Source", "Name", "Phone", "Email",
  "Country", "University", "Course", "Loan Amount", "Family Income", "Collateral",
];

const TAB_HEADERS: Record<string, string[]> = {
  "Eligibility Leads": ELIGIBILITY_COLUMNS,
  "Pooja Referral":    ELIGIBILITY_COLUMNS,
  Referrals: [
    "ID", "Date", "Status", "Referrer Name", "Referrer Phone", "Referrer Email",
    "Ref1 Name", "Ref1 Phone", "Ref1 Country", "Ref1 Loan Amount",
    "Ref2 Name", "Ref2 Phone", "Ref2 Country", "Ref2 Loan Amount",
  ],
  "Partner Inquiries": [
    "ID", "Date", "Status", "Contact Name", "Phone", "Email",
    "Organisation Name", "Organisation Type", "Message",
  ],
  "Service Leads": [
    "ID", "Date", "Status", "Name", "Phone", "Email", "Service", "Message",
  ],
  "Contact Leads": [
    "ID", "Date", "Status", "Name", "Phone", "Email", "Message",
  ],
};

function getTabForLead(lead: Lead): string {
  // Route creator referral leads to their own dedicated tab
  if (lead.type === "eligibility" && lead.source && CREATOR_TABS[lead.source]) {
    return CREATOR_TABS[lead.source];
  }
  switch (lead.type) {
    case "eligibility": return "Eligibility Leads";
    case "referral":    return "Referrals";
    case "partner":     return "Partner Inquiries";
    case "service":     return "Service Leads";
    case "contact":     return "Contact Leads";
  }
}

// Prefix phone numbers with an apostrophe so Google Sheets (USER_ENTERED mode)
// treats them as plain text instead of trying to evaluate +91... as a formula.
// The apostrophe is a standard Sheets "force text" prefix — it never appears in the cell.
function phone(p: string): string {
  const trimmed = p.trim();
  return trimmed ? `'${trimmed}` : "";
}

function leadToRow(lead: Lead): string[] {
  const date = new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  switch (lead.type) {
    case "eligibility":
      return [
        lead.id, date, lead.status, lead.source ?? "website",
        lead.name, phone(lead.phone), lead.email,
        lead.country, lead.university, lead.course,
        lead.loanAmount, lead.familyIncome, lead.collateral,
      ];
    case "referral": {
      const r1 = lead.referrals[0];
      const r2 = lead.referrals[1];
      return [
        lead.id, date, lead.status,
        lead.name, phone(lead.phone), lead.email,
        r1?.name ?? "", phone(r1?.phone ?? ""), r1?.country ?? "", r1?.loanAmount ?? "",
        r2?.name ?? "", phone(r2?.phone ?? ""), r2?.country ?? "", r2?.loanAmount ?? "",
      ];
    }
    case "partner":
      return [
        lead.id, date, lead.status,
        lead.contactName, phone(lead.phone), lead.email,
        lead.organizationName, lead.organizationType, lead.message,
      ];
    case "service":
      return [
        lead.id, date, lead.status,
        lead.name, phone(lead.phone), lead.email, lead.service, lead.message,
      ];
    case "contact":
      return [
        lead.id, date, lead.status,
        lead.name, phone(lead.phone), lead.email, lead.message,
      ];
  }
}

function resolvePrivateKey(): string | null {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_B64;
  if (b64) return Buffer.from(b64, "base64").toString("utf-8");

  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!raw) return null;
  return raw.includes("\\n") ? raw.replace(/\\n/g, "\n") : raw;
}

async function ensureTabExists(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tab: string
): Promise<boolean> {
  try {
    await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tab}!A1:A1`,
    });
    return true;
  } catch {
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: tab } } }],
        },
      });
      console.log("[sheets] Created tab:", tab);
      return false;
    } catch (createErr) {
      console.error("[sheets] Failed to create tab:", tab, createErr);
      throw createErr;
    }
  }
}

export async function appendLeadToSheet(lead: Lead): Promise<void> {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const PRIVATE_KEY = resolvePrivateKey();

  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    console.error("[sheets] Missing env vars:", {
      SPREADSHEET_ID: !!SPREADSHEET_ID,
      CLIENT_EMAIL: !!CLIENT_EMAIL,
      PRIVATE_KEY: !!PRIVATE_KEY,
    });
    return;
  }

  const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const tab = getTabForLead(lead);

  const tabExisted = await ensureTabExists(sheets, SPREADSHEET_ID, tab);

  let hasHeaders = false;
  if (tabExisted) {
    try {
      const existing = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${tab}!A1:A1`,
      });
      hasHeaders = !!existing.data.values?.length;
    } catch {
      hasHeaders = false;
    }
  }

  const rows: string[][] = [];
  if (!hasHeaders) rows.push(TAB_HEADERS[tab]);
  rows.push(leadToRow(lead));

  // USER_ENTERED preserves Unicode (₹, –, etc.) correctly.
  // Phone numbers are prefixed with ' to prevent formula interpretation.
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${tab}!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: rows },
  });

  console.log("[sheets] Appended lead", lead.id, "to tab:", tab);
}
