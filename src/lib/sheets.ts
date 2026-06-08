import { google } from "googleapis";
import type { Lead } from "./types";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

const TAB_HEADERS: Record<string, string[]> = {
  "Eligibility Leads": [
    "ID", "Date", "Status", "Source", "Name", "Phone", "Email",
    "Country", "University", "Course", "Loan Amount", "Family Income", "Collateral",
  ],
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
  switch (lead.type) {
    case "eligibility": return "Eligibility Leads";
    case "referral":    return "Referrals";
    case "partner":     return "Partner Inquiries";
    case "service":     return "Service Leads";
    case "contact":     return "Contact Leads";
  }
}

function leadToRow(lead: Lead): string[] {
  const date = new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  switch (lead.type) {
    case "eligibility":
      return [
        lead.id, date, lead.status, lead.source ?? "website",
        lead.name, lead.phone, lead.email,
        lead.country, lead.university, lead.course,
        lead.loanAmount, lead.familyIncome, lead.collateral,
      ];
    case "referral": {
      const r1 = lead.referrals[0];
      const r2 = lead.referrals[1];
      return [
        lead.id, date, lead.status,
        lead.name, lead.phone, lead.email,
        r1?.name ?? "", r1?.phone ?? "", r1?.country ?? "", r1?.loanAmount ?? "",
        r2?.name ?? "", r2?.phone ?? "", r2?.country ?? "", r2?.loanAmount ?? "",
      ];
    }
    case "partner":
      return [
        lead.id, date, lead.status,
        lead.contactName, lead.phone, lead.email,
        lead.organizationName, lead.organizationType, lead.message,
      ];
    case "service":
      return [
        lead.id, date, lead.status,
        lead.name, lead.phone, lead.email, lead.service, lead.message,
      ];
    case "contact":
      return [
        lead.id, date, lead.status,
        lead.name, lead.phone, lead.email, lead.message,
      ];
  }
}

export async function appendLeadToSheet(lead: Lead): Promise<void> {
  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) return;

  const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const tab = getTabForLead(lead);

  // Check if the tab is empty and needs headers
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${tab}!A1:A1`,
  });

  const rows: string[][] = [];
  if (!existing.data.values?.length) {
    rows.push(TAB_HEADERS[tab]);
  }
  rows.push(leadToRow(lead));

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${tab}!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: rows },
  });
}
