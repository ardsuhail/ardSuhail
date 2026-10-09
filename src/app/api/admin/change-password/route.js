import connectDB from "@/db/connectDB";
import AdminSignUp from "@/model/AdminSignUp";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/Check_Token";

export async function PATCH(req) {
  try {
    const authAdmin = await getAdmin();

    if (!authAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { oldPassword, newPassword, confirmPassword } = await req.json();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match" },
        { status: 400 },
      );
    }

    await connectDB();

    const admin = await AdminSignUp.findById(authAdmin.id);

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 },
      );
    }

    const match = await bcrypt.compare(oldPassword, admin.password);

    if (!match) {
      return NextResponse.json(
        { success: false, message: "Old password is incorrect" },
        { status: 400 },
      );
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.error("Password update error:", error);

    return NextResponse.json(
      { success: false, message: "Server error. Try again later." },
      { status: 500 },
    );
  }
}
