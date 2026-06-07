import { NextRequest, NextResponse } from "next/server";
import { addLead, searchLeads } from "@/lib/store";
import type {
  EligibilityLead,
  ContactLead,
  PartnerInquiry,
  ServiceLead,
  ReferralLead,
} from "@/lib/types";
import { randomUUID } from "crypto";

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD || "uniloan2024";
  return auth === `Bearer ${password}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || undefined;
  const type = searchParams.get("type") || undefined;
  const status = searchParams.get("status") || undefined;

  const leads = await searchLeads({ query, type, status });
  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const now = new Date().toISOString();
    const id = randomUUID();

    let lead: EligibilityLead | ContactLead | PartnerInquiry | ServiceLead | ReferralLead;

    switch (body.type) {
      case "eligibility":
        lead = {
          id,
          type: "eligibility",
          name: body.name,
          phone: body.phone,
          email: body.email,
          country: body.country,
          university: body.university,
          course: body.course,
          loanAmount: body.loanAmount,
          familyIncome: body.familyIncome,
          collateral: body.collateral,
          status: "new",
          source: body.source || "website",
          createdAt: now,
          updatedAt: now,
        };
        break;
      case "contact":
        lead = {
          id,
          type: "contact",
          name: body.name,
          phone: body.phone,
          email: body.email,
          message: body.message,
          status: "new",
          createdAt: now,
          updatedAt: now,
        };
        break;
      case "partner":
        lead = {
          id,
          type: "partner",
          organizationName: body.organizationName,
          contactName: body.contactName,
          phone: body.phone,
          email: body.email,
          organizationType: body.organizationType,
          message: body.message,
          status: "new",
          createdAt: now,
          updatedAt: now,
        };
        break;
      case "service":
        lead = {
          id,
          type: "service",
          service: body.service,
          name: body.name,
          phone: body.phone,
          email: body.email,
          message: body.message || "",
          status: "new",
          createdAt: now,
          updatedAt: now,
        };
        break;
      case "referral":
        lead = {
          id,
          type: "referral",
          name: body.name,
          phone: body.phone,
          email: body.email,
          referrals: body.referrals ?? [],
          status: "new",
          createdAt: now,
          updatedAt: now,
        };
        break;
      default:
        return NextResponse.json({ error: "Invalid lead type" }, { status: 400 });
    }

    await addLead(lead);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    const { updateLeadStatus } = await import("@/lib/store");
    const updated = await updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
