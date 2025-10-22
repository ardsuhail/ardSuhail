import bcrypt from "bcrypt";
import connectDB from "@/db/connectDB";
import AdminSignUp from "@/model/AdminSignUp";

export async function POST(req) {
  await connectDB();
  const { email, newPassword } = await req.json();

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await AdminSignUp.updateOne(
    { email },
    {
      $set: { password: hashedPassword },
      $unset: { resetOtp: "", resetOtpExpire: "" },
    }
  );

  return Response.json({ success: true, message: "Password reset successful" });
}
