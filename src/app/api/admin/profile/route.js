import AdminSignUp from "@/model/AdminSignUp";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    // Cookie se token nikalna
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Token verify karna
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const email = decoded.email;

    // Admin fetch karna
    const admin = await AdminSignUp.findOne({ email });
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin not found" }, { status: 404 });
    }

    // Password exclude kar ke return
    const { password, ...adminData } = admin._doc;

    return NextResponse.json({ success: true, admin: adminData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
