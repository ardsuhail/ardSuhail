import AdminSignUp from "@/model/AdminSignUp";
import connectDB from "@/db/connectDB";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req) {
    try {
        await connectDB()
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
            { expiresIn: "1d" } // ya jitna duration chahiye
        );

        // const token = jwt.sign(
        //     { id: admin._id, email: admin.email },
        //     process.env.JWT_SECRET, // .env me JWT_SECRET set karna
        //     { expiresIn: "1d" }
        // );
        return NextResponse.json({
            success: true,
            error: false,
            message: "Login Succesfully",
            token
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: true,
            error: false,
            message: "Server Error please Try Again later"
        })
    }
}