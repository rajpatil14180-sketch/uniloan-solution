import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  // 1. Check env vars are present
  const envCheck = {
    SPREADSHEET_ID: SPREADSHEET_ID ? `✓ set (${SPREADSHEET_ID.slice(0, 8)}...)` : "✗ MISSING",
    CLIENT_EMAIL: CLIENT_EMAIL ? `✓ set (${CLIENT_EMAIL})` : "✗ MISSING",
    PRIVATE_KEY: PRIVATE_KEY
      ? `✓ set (starts with: ${PRIVATE_KEY.slice(0, 30)}...)`
      : "✗ MISSING",
  };

  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    return NextResponse.json({ error: "Missing env vars", envCheck }, { status: 500 });
  }

  // 2. Try to authenticate
  try {
    const auth = new google.auth.JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // 3. Try a read to confirm access
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
