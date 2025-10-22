import connectDB from "@/db/connectDB";
import AdminSignUp from "@/model/AdminSignUp";

export async function POST(req) {
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
