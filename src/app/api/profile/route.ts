import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/db";
import { ProfileSchema } from "@/lib/zod-schemas";
import bcrypt from "bcrypt";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validationResult = ProfileSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
      { error: "Validation failed", details: validationResult.error.format() },
      { status: 400 }
    );
  }

  const { name, currentPassword, newPassword } = validationResult.data;

  const client = await clientPromise;
  const db = client.db();
  
  // Get user from DB
  // Assuming session.user.email is unique and available
  const user = await db.collection("users").findOne({ email: session.user.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Verify current password
  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
  }

  const updateData: { name: string; updatedAt: Date; password?: string } = {
    name: name,
    updatedAt: new Date(),
  };

  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateData.password = hashedPassword;
  }

  await db.collection("users").updateOne(
    { _id: user._id },
    { $set: updateData }
  );

  return NextResponse.json({ message: "Profile updated successfully" });
}
