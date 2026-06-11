import { NextResponse } from "next/server";
import { sendContactEmail, validateContactPayload } from "@/lib/email";

export const runtime = "nodejs";

const hits = new Map();

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";
  const now = Date.now();
  const recent = hits.get(ip) || [];
  const validHits = recent.filter((time) => now - time < 60_000);
  if (validHits.length >= 4) {
    return NextResponse.json({ message: "Too many messages. Try again shortly." }, { status: 429 });
  }
  hits.set(ip, [...validHits, now]);

  const payload = await request.json();
  const validation = validateContactPayload(payload);
  if (!validation.ok) {
    return NextResponse.json({ message: "Check the highlighted fields.", errors: validation.errors }, { status: 400 });
  }

  try {
    await sendContactEmail(validation.data);
    return NextResponse.json({ message: "Message sent." });
  } catch (error) {
    return NextResponse.json(
      { message: "Email is not configured yet. Check SMTP environment variables." },
      { status: 500 }
    );
  }
}
