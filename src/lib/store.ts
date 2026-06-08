import { promises as fs } from "fs";
import path from "path";
import type { Lead, LeadStatus } from "./types";
import { appendLeadToSheet } from "./sheets";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readLeads(): Promise<Lead[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data) as Lead[];
  } catch {
    return [];
  }
}

async function writeLeads(leads: Lead[]) {
  await ensureDataDir();
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function getAllLeads(): Promise<Lead[]> {
  const leads = await readLeads();
  return leads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addLead(lead: Lead): Promise<Lead> {
  // JSON file write works locally but will fail on Netlify (read-only filesystem) — that's fine
  try {
    const leads = await readLeads();
    leads.push(lead);
    await writeLeads(leads);
  } catch {
    // Silently skip — Google Sheets is the persistent store in production
  }

  // Must be awaited — serverless functions shut down on response, fire-and-forget gets killed
  try {
    await appendLeadToSheet(lead);
  } catch (err) {
    console.error("[sheets] failed to append lead:", err);
  }
  return lead;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<Lead | null> {
  const leads = await readLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  leads[index] = {
    ...leads[index],
    status,
    updatedAt: new Date().toISOString(),
  };
  await writeLeads(leads);
  return leads[index];
}

export async function searchLeads(params: {
  query?: string;
  type?: string;
  status?: string;
}): Promise<Lead[]> {
  let leads = await getAllLeads();
  const { query, type, status } = params;

  if (type && type !== "all") {
    leads = leads.filter((l) => l.type === type);
  }
  if (status && status !== "all") {
    leads = leads.filter((l) => l.status === status);
  }
  if (query) {
    const q = query.toLowerCase();
    leads = leads.filter((l) => {
      const searchable = JSON.stringify(l).toLowerCase();
      return searchable.includes(q);
    });
  }
  return leads;
}

export function leadsToCSV(leads: Lead[]): string {
  const headers = [
    "id",
    "type",
    "status",
    "name",
    "phone",
    "email",
    "createdAt",
    "details",
  ];
  const rows = leads.map((lead) => {
    const base = {
      id: lead.id,
      type: lead.type,
      status: lead.status,
      name: "name" in lead ? lead.name : lead.contactName,
      phone: lead.phone,
      email: lead.email,
      createdAt: lead.createdAt,
      details: "",
    };

    if (lead.type === "eligibility") {
      base.details = JSON.stringify({
        country: lead.country,
        university: lead.university,
        course: lead.course,
        loanAmount: lead.loanAmount,
        familyIncome: lead.familyIncome,
        collateral: lead.collateral,
      });
    } else if (lead.type === "partner") {
      base.name = lead.contactName;
      base.details = JSON.stringify({
        organizationName: lead.organizationName,
        organizationType: lead.organizationType,
        message: lead.message,
      });
    } else if (lead.type === "service") {
      base.details = JSON.stringify({
        service: lead.service,
        message: lead.message,
      });
    } else if (lead.type === "referral") {
      base.details = JSON.stringify({ referrals: lead.referrals });
    } else {
      base.details = (lead as { message?: string }).message ?? "";
    }

    return [
      base.id,
      base.type,
      base.status,
      `"${base.name}"`,
      base.phone,
      base.email,
      base.createdAt,
      `"${base.details.replace(/"/g, '""')}"`,
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
