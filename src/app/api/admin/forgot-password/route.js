import nodemailer from "nodemailer";
import connectDB from "@/db/connectDB";
import AdminSignUp from "@/model/AdminSignUp";

export async function POST(req) {
  await connectDB();
  const { email } = await req.json();

  const user = await AdminSignUp.findOne({ email });
  if (!user) {
    return Response.json({ success: false, message: "Email not found" });
  }

  // Generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Save OTP in user document (with expiry)
  user.resetOtp = otp;
  user.resetOtpExpire = Date.now() + 5 * 60 * 1000; // 5 min
  await user.save();

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  });

  return Response.json({ success: true, message: "OTP sent to your email" });
}
