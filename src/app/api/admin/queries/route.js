// app/api/admin/queries/route.js
import connectDB from "@/db/connectDB";
import Queries from "@/model/Queries";
import { NextResponse } from "next/server";

// GET - Fetch all queries
export async function GET(req) {
    try {
        await connectDB();
        
        // Get query params for filtering
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit')) || 50;
        
        // Build filter
        let filter = {};
        if (status && status !== 'all') {
            filter.status = status;
        }
        
        const queries = await Queries.find(filter)
            .sort({ isRead: 1, createdAt: -1 })
            .limit(limit);
        
        // Get counts for dashboard
        const counts = {
            total: await Queries.countDocuments(),
            pending: await Queries.countDocuments({ status: 'pending' }),
            replied: await Queries.countDocuments({ status: 'replied' }),
            resolved: await Queries.countDocuments({ status: 'resolved' }),
            unread: await Queries.countDocuments({ isRead: false })
        };
        
        return NextResponse.json({
            success: true,
            error: false,
            counts,
            data: queries
        });
        
    } catch (error) {
        console.error("Error in GET /api/admin/queries:", error);
        return NextResponse.json({
            success: false,
            error: true,
            message: "Failed to fetch queries"
        }, { status: 500 });
    }
}

// PUT - Mark as read
export async function PUT(req) {
    try {
        await connectDB();
        const { queryId, status } = await req.json();
        
        const updateData = {};
        if (status) updateData.status = status;
        if (!updateData.isRead) updateData.isRead = true;
        
        const updated = await Queries.findByIdAndUpdate(
            queryId,
            updateData,
            { new: true }
        );
        
        return NextResponse.json({
            success: true,
            error: false,
            data: updated
        });
        
    } catch (error) {
        console.error('PUT API error:', error);
        return NextResponse.json({
            success: false,
            error: true,
            message: error.message
        }, { status: 500 });
    }
}