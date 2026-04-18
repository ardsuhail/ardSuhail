import connectDB from "@/db/connectDB";
import Project from "@/model/Project";
import ViewLog from "@/model/ViewLog";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        
        // Get client IP
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                   req.headers.get('x-real-ip') || 
                   'unknown';
        
        // Check if already viewed in last 24 hours
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        
        const existingView = await ViewLog.findOne({
            projectId: id,
            ip: ip,
            viewedAt: { $gte: twentyFourHoursAgo }
        });
        
        if (existingView) {
            // Already viewed in last 24 hours
            const project = await Project.findById(id);
            return NextResponse.json({
                success: true,
                error: false,
                views: project?.views || 0,
                message: "Already counted in last 24 hours"
            }, { status: 200 });
        }
        
        // Increment project views
        const project = await Project.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );
        
        if (!project) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Project not found"
            }, { status: 404 });
        }
        
        // Log this view
        await ViewLog.create({
            projectId: id,
            ip: ip,
            viewedAt: new Date()
        });
        
        return NextResponse.json({
            success: true,
            error: false,
            views: project.views,
            message: "View counted successfully"
        }, { status: 200 });
        
    } catch (error) {
        console.error("Error incrementing views:", error);
        
        return NextResponse.json({
            success: false,
            error: true,
            message: error.message || "Server error"
        }, { status: 500 });
    }
}