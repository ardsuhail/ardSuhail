import connectDB from "@/db/connectDB";
import AdminSignUp from "@/model/AdminSignUp";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function PATCH(req) {
    try {
        await connectDB()
        const token = req.cookies.get("token")?.value;
        console.log("token: ",token)
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        const email = decoded.email;
        const body = await req.json()
        const {  oldPassword, newPassword, confirmPassword } = body
        if (!oldPassword || !newPassword || !confirmPassword) {
            return NextResponse.json({
                success: false,
                error: false,
                message: "All fields are required"
            })
        }
        const admin = await AdminSignUp.findOne({ email });
        if (!admin) {
            return NextResponse.json({ success: false, message: "Admin not found!" });
        }

        const match = await bcrypt.compare(oldPassword, admin.password);

        if (!match) {
            return NextResponse.json({
                success: false,
                message: "Old password incorrect!",
            });
        }
        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();

        return NextResponse.json({
            success: true,
            message: "Password updated successfully!",
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Server error. Try again later.",
        });

    }
}
