import AdminSignUp from "@/model/AdminSignUp";
import connectDB from "@/db/connectDB";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// ✅ Same parsing logic as proxy.js
const ALLOWED_IPS = (() => {
    try {
        const ips = JSON.parse(process.env.ALLOWED_IPS || '[]');
        return Array.isArray(ips) ? ips : [];
    } catch {
        return [];
    }
})();

function getClientIp(req) {
    return (
        req.ip ||
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        req.headers.get('x-real-ip') ||
        ''
    )
}

export async function POST(req) {
    try {
        await connectDB()
        
        // ✅ IP check with proper parsing
        const clientIp = getClientIp(req);
        
        if (ALLOWED_IPS.length > 0 && !ALLOWED_IPS.includes(clientIp)) {
            console.log('🚫 Login API - Access denied for IP:', clientIp);
            return NextResponse.json(
                { success: false, error: true, message: 'Access denied' },
                { status: 403 }
            )
        }
        
        const body = await req.json()

        const { email, password } = body
        const admin = await AdminSignUp.findOne({ email })
        if (!admin) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Admin Not Found"
            })
        }
        const ComparePassword = await bcrypt.compare(password, admin.password)
        if (!ComparePassword) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Invaled Password"
            })
        }
        const token = jwt.sign(
            { email: admin.email, username: admin.username, id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const response = NextResponse.json({
            success: true,
            error: false,
            message: "Login Successfully",
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: true,
            error: false,
            message: "Server Error please Try Again later"
        })
    }
}