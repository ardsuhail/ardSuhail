import connectDB from "@/db/connectDB";
import Queries from "@/model/Queries";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        await connectDB()
        const body = await req.json()
        const { name, email, message } = body
        if (!name || !email || !message) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "All fields are requried"
            })
        }
        const newquery = await Queries.create({
            name,
            email,
            message
        })
        // Send Email Notification
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

      await  transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Email error:", error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        // 2️⃣ User Confirmation Email
        await transporter.sendMail({
            from: `"Suhail Portfolio" <${process.env.EMAIL_USER}>`,
            to: email, // user email
            subject: "✅ Your Query has been received",
            html: `
        <h2>Thank you ${name}!</h2>
        <p>We’ve received your message and will get back to you soon.</p>
        <p><b>Your Message:</b></p>
        <blockquote>${message}</blockquote>
        <p>— Team Suhail</p>
      `,
        });


        return NextResponse.json({
            success: true,
            error: false,
            message: "Your Query submitted Successfully",
            newquery
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            error: true,
            message: "Server Error Please Try Again later"
        })
    }
}



export async function GET(req) {
    try {
        await connectDB()
        const query = await Queries.find().sort({ createdAt: -1 })
        return NextResponse.json({
            success: true,
            query
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            error: true,
            message: "Server Error please Check Console for More Details and Refresh The page Or Try After Some Time"
        });

    }
}