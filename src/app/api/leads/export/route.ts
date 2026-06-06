import { NextRequest, NextResponse } from "next/server";
import { searchLeads, leadsToCSV } from "@/lib/store";

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD || "uniloan2024";

  if (auth !== `Bearer ${password}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || undefined;
  const type = searchParams.get("type") || undefined;
  const status = searchParams.get("status") || undefined;

  const leads = await searchLeads({ query, type, status });
  const csv = leadsToCSV(leads);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="uniloan-leads-${Date.now()}.csv"`,
    },
  });
}
