import connectDB from "@/db/connectDB";
import Reply from "@/model/Reply";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { userEmail, replyMessage } = body;

    if (!userEmail || !replyMessage) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save reply to DB
    const newreply = await Reply.create({ userEmail, replyMessage });

    // Send reply email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Suhail Portfolio" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "💬 Reply from Suhail Portfolio",
      html: `
        <h2>Hello!</h2>
        <p>You’ve received a reply to your query:</p>
        <blockquote>${replyMessage}</blockquote>
        <p>Best regards,<br/>— Suhail</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Reply sent successfully!",
      newreply,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
}

export async function GET() {
  try {
    await connectDB();
    const replies = await Reply.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, replies });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Server Error, please check console for details.",
    });
  }
}
