import bcrypt from "bcrypt";
import connectDB from "@/db/connectDB";
import AdminSignUp from "@/model/AdminSignUp";
import { getAdmin } from "@/lib/Check_Token";
import { NextResponse } from "next/server";
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
