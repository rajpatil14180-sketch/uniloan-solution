import { NextResponse } from "next/server";
import { google } from "googleapis";

function resolvePrivateKey(): string | null {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_B64;
  if (b64) return Buffer.from(b64, "base64").toString("utf-8");
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!raw) return null;
  return raw.includes("\\n") ? raw.replace(/\\n/g, "\n") : raw;
}

export async function GET() {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const PRIVATE_KEY = resolvePrivateKey();

  const envCheck = {
    SPREADSHEET_ID: SPREADSHEET_ID ? `✓ set (${SPREADSHEET_ID.slice(0, 8)}...)` : "✗ MISSING",
    CLIENT_EMAIL: CLIENT_EMAIL ? `✓ set (${CLIENT_EMAIL})` : "✗ MISSING",
    PRIVATE_KEY_B64: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_B64 ? "✓ set" : "✗ MISSING",
    PRIVATE_KEY_RAW: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ? "✓ set" : "✗ MISSING",
    PRIVATE_KEY_resolved: PRIVATE_KEY
      ? `✓ resolved (starts with: ${PRIVATE_KEY.slice(0, 27)}...)`
      : "✗ could not resolve",
  };

  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    return NextResponse.json({ error: "Missing env vars", envCheck }, { status: 500 });
  }

  try {
    const auth = new google.auth.JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const tabNames = res.data.sheets?.map((s) => s.properties?.title) ?? [];

    return NextResponse.json({
      success: true,
      envCheck,
      spreadsheetTitle: res.data.properties?.title,
      tabs: tabNames,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error: "Google Sheets connection failed",
        envCheck,
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
