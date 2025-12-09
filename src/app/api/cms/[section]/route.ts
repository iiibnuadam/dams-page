import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SectionSchemas } from "@/lib/zod-schemas";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const client = await clientPromise;
  if (!client) {
    return NextResponse.json({});
  }
  
  const { section } = await params;
  const db = client.db();
  
  // Map section name to Collection name (Capitalized)
  const collectionName = section.charAt(0).toUpperCase() + section.slice(1);
  
  const data = await db.collection(collectionName).findOne({});
  return NextResponse.json(data || {});
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  if (!client) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const { section } = await params;
  const body = await request.json();

  // Validation
  const schema = SectionSchemas[section as keyof typeof SectionSchemas];
  if (!schema) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const validationResult = schema.safeParse(body);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: "Validation failed", details: validationResult.error.format() },
      { status: 400 }
    );
  }

  const collectionName = section.charAt(0).toUpperCase() + section.slice(1);
  const db = client.db();

  // Update or Create (Upsert)
  // We assume there is only one document per section for this portfolio
  // We use updateOne with upsert: true. 
  // Since we want a singleton, we can try to find *any* document, or just always update the first one found?
  // Better: delete all and insert one, or update based on a fixed ID?
  // Let's assume we just want one document. We can use a fixed _id or just findOneAndUpdate.
  
  // If we use findOneAndUpdate with an empty filter {}, it will update the first one it finds.
  // If none exists, it will insert one if upsert is true.
  
  const result = await db.collection(collectionName).findOneAndUpdate(
    {},
    { $set: body },
    { upsert: true, returnDocument: 'after' }
  );

  return NextResponse.json(result);
}
