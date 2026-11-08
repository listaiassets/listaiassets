import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const adminSecret = process.env.ADMIN_SECRET_KEY || "listaiassets_admin";

  if (key !== adminSecret) {
    return NextResponse.json(
      { error: "Unauthorized. Pass ?key=your_admin_key" },
      { status: 401 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), "data", "submissions.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ submissions: [] });
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return NextResponse.json({ submissions: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

