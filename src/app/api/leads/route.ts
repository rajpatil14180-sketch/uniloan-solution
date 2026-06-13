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

// Simple in-memory rate limiter — max 10 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Prune expired entries to prevent unbounded memory growth
  if (rateLimitMap.size > 500) {
    for (const [k, v] of rateLimitMap) {
      if (now > v.resetAt) rateLimitMap.delete(k);
    }
  }
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return auth === `Bearer ${password}`;
}

function sanitize(value: unknown, maxLen = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[+\d\s\-()]{7,20}$/.test(phone);
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
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();
    // Silently accept honeypot-filled submissions so bots get no signal
    if (body._hp) return NextResponse.json({ success: true, id: randomUUID() }, { status: 201 });
    const now = new Date().toISOString();
    const id = randomUUID();

    let lead: EligibilityLead | ContactLead | PartnerInquiry | ServiceLead | ReferralLead;

    switch (body.type) {
      case "eligibility": {
        const name = sanitize(body.name);
        const phone = sanitize(body.phone, 20);
        const email = sanitize(body.email, 200);
        if (!name || !phone || !email) return NextResponse.json({ error: "Name, phone and email are required." }, { status: 400 });
        if (!isValidEmail(email)) return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        if (!isValidPhone(phone)) return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
        lead = {
          id, type: "eligibility", status: "new",
          name, phone, email,
          country: sanitize(body.country),
          university: sanitize(body.university),
          course: sanitize(body.course),
          loanAmount: sanitize(body.loanAmount, 50),
          familyIncome: sanitize(body.familyIncome, 50),
          collateral: sanitize(body.collateral, 50),
          source: sanitize(body.source, 50) || "website",
          createdAt: now, updatedAt: now,
        };
        break;
      }
      case "contact": {
        const name = sanitize(body.name);
        const phone = sanitize(body.phone, 20);
        const email = sanitize(body.email, 200);
        if (!name || !phone || !email) return NextResponse.json({ error: "Name, phone and email are required." }, { status: 400 });
        if (!isValidEmail(email)) return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        if (!isValidPhone(phone)) return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
        lead = {
          id, type: "contact", status: "new",
          name, phone, email,
          message: sanitize(body.message, 2000),
          createdAt: now, updatedAt: now,
        };
        break;
      }
      case "partner": {
        const contactName = sanitize(body.contactName);
        const phone = sanitize(body.phone, 20);
        const email = sanitize(body.email, 200);
        if (!contactName || !phone || !email) return NextResponse.json({ error: "Contact name, phone and email are required." }, { status: 400 });
        if (!isValidEmail(email)) return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        if (!isValidPhone(phone)) return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
        lead = {
          id, type: "partner", status: "new",
          contactName, phone, email,
          organizationName: sanitize(body.organizationName),
          organizationType: sanitize(body.organizationType, 100),
          message: sanitize(body.message, 2000),
          createdAt: now, updatedAt: now,
        };
        break;
      }
      case "service": {
        const name = sanitize(body.name);
        const phone = sanitize(body.phone, 20);
        const email = sanitize(body.email, 200);
        if (!name || !phone || !email) return NextResponse.json({ error: "Name, phone and email are required." }, { status: 400 });
        if (!isValidEmail(email)) return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        if (!isValidPhone(phone)) return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
        lead = {
          id, type: "service", status: "new",
          name, phone, email,
          service: sanitize(body.service, 100),
          message: sanitize(body.message, 2000),
          createdAt: now, updatedAt: now,
        };
        break;
      }
      case "referral": {
        const name = sanitize(body.name);
        const phone = sanitize(body.phone, 20);
        const email = sanitize(body.email, 200);
        if (!name || !phone || !email) return NextResponse.json({ error: "Name, phone and email are required." }, { status: 400 });
        if (!isValidEmail(email)) return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        if (!isValidPhone(phone)) return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
        const referrals = Array.isArray(body.referrals)
          ? body.referrals.slice(0, 5).map((r: Record<string, unknown>) => ({
              name: sanitize(r.name as string),
              phone: sanitize(r.phone as string, 20),
              country: sanitize(r.country as string),
              loanAmount: sanitize(r.loanAmount as string, 50),
            }))
          : [];
        lead = {
          id, type: "referral", status: "new",
          name, phone, email, referrals,
          createdAt: now, updatedAt: now,
        };
        break;
      }
      default:
        return NextResponse.json({ error: "Invalid lead type." }, { status: 400 });
    }

    await addLead(lead);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
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
