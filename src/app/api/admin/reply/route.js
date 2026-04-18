// app/api/admin/reply/route.js
import connectDB from "@/db/connectDB";
import Queries from "@/model/Queries";
import Reply from "@/model/Reply";
import { emailService } from "@/lib/emailService";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        
        const { queryId, userEmail, userName, replyMessage, replySubject, repliedBy, originalMessage } = await req.json();
        
        if (!queryId || !replyMessage) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Query ID and reply message are required"
            }, { status: 400 });
        }
        
        // Save reply to database
        const newReply = await Reply.create({
            queryId,
            userEmail,
            userName,
            replyMessage,
            replySubject: replySubject || "Reply to your query",
            repliedBy: repliedBy || "Admin"
        });
        
        // Update query status
        const updatedQuery = await Queries.findByIdAndUpdate(queryId, {
            status: 'replied',
            repliedAt: new Date(),
            isRead: true
        }, { new: true });
        
        // Send email to user
        await emailService.sendUserReply(userName, userEmail, replyMessage, originalMessage, newReply.replySubject, newReply.repliedBy);
        
        return NextResponse.json({
            success: true,
            error: false,
            message: "Reply sent successfully!",
            data: newReply
        }, { status: 201 });
        
    } catch (error) {
        console.error("Error in POST /api/admin/reply:", error);
        return NextResponse.json({
            success: false,
            error: true,
            message: "Failed to send reply"
        }, { status: 500 });
    }
}

// GET - Get replies for a query
export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const queryId = searchParams.get('queryId');
        
        if (!queryId) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Query ID required"
            }, { status: 400 });
        }
        
        const replies = await Reply.find({ queryId }).sort({ createdAt: 1 });
        
        return NextResponse.json({
            success: true,
            error: false,
            data: replies
        });
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: true,
            message: error.message
        }, { status: 500 });
    }
}