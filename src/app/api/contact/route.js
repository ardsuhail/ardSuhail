// import connectDB from "@/db/connectDB";
// import Queries from "@/model/Queries";
// import { NextResponse } from "next/server";
// import nodemailer from 'nodemailer';

// export async function POST(req) {
//     try {
//         await connectDB()
//         const body = await req.json()
//         const { name, email, message } = body
//         if (!name || !email || !message) {
//             return NextResponse.json({
//                 success: false,
//                 error: true,
//                 message: "All fields are requried"
//             })
//         }
//         const newquery = await Queries.create({
//             name,
//             email,
//             message
//         })
//         // Send Email Notification
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: process.env.ADMIN_EMAIL,
//             subject: 'New Contact Form Submission',
//             text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
//         };

//       await  transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log("Email error:", error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         });
//         // 2️⃣ User Confirmation Email
//         await transporter.sendMail({
//             from: `"Suhail Portfolio" <${process.env.EMAIL_USER}>`,
//             to: email, // user email
//             subject: "✅ Your Query has been received",
//             html: `
//         <h2>Thank you ${name}!</h2>
//         <p>We’ve received your message and will get back to you soon.</p>
//         <p><b>Your Message:</b></p>
//         <blockquote>${message}</blockquote>
//         <p>— Team Suhail</p>
//       `,
//         });


//         return NextResponse.json({
//             success: true,
//             error: false,
//             message: "Your Query submitted Successfully",
//             newquery
//         })
//     } catch (error) {
//         console.error(error)
//         return NextResponse.json({
//             success: false,
//             error: true,
//             message: "Server Error Please Try Again later"
//         })
//     }
// }



// app/api/contact/route.js
import connectDB from "@/db/connectDB";
import Queries from "@/model/Queries";
import { emailService } from "@/lib/emailService";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        
        const { name, email, message } = await req.json();
        
        // Validation
        if (!name || !email || !message) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "All fields are required"
            }, { status: 400 });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Invalid email format"
            }, { status: 400 });
        }
        
        // Save to database
        const newQuery = await Queries.create({
            name,
            email,
            message,
            status: 'pending',
            isRead: false
        });
        
        // Send emails (don't wait for response)
        Promise.all([
            emailService.sendUserConfirmation(name, email, message),
            emailService.sendAdminNotification(name, email, message)
        ]).catch(err => console.error("Email sending failed:", err));
        
        return NextResponse.json({
            success: true,
            error: false,
            message: "Your query has been submitted successfully! We'll get back to you soon.",
            data: newQuery
        }, { status: 201 });
        
    } catch (error) {
        console.error("Error in POST /api/contact:", error);
        return NextResponse.json({
            success: false,
            error: true,
            message: "Server error. Please try again later."
        }, { status: 500 });
    }
}