import connectDB from "@/db/connectDB";
import AdminSignUp from "@/model/AdminSignUp";
import NextResponse from "next/server";
import { getAdmin } from "@/lib/Check_Token";
export async function POST(req) {
  const authAdmin = await getAdmin();
  if (!authAdmin) {
    return NextResponse.json(
      {
        success: false,
        error: true,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }
  await connectDB();
  const { email, otp } = await req.json();

  const user = await AdminSignUp.findOne({ email });
  if (!user) return Response.json({ success: false, message: "Invalid email" });

  if (user.resetOtp !== Number(otp))
    return Response.json({ success: false, message: "Invalid OTP" });

  if (user.resetOtpExpire < Date.now())
    return Response.json({ success: false, message: "OTP expired" });

  // OTP correct → allow user to create new password
  return Response.json({ success: true, message: "OTP verified successfully" });
}
