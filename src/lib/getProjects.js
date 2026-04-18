// fetch projects access direct db as server component
import connectDB from "@/db/connectDB";
import Project from "@/model/Project";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
export async function getProjects() {
    try {
        await connectDB()
        const projects = await Project.find().sort({ createdAt: -1 })
        // pass plan objects  to client component this not releted to cloudinary
        return JSON.parse(JSON.stringify(projects))
        
    } catch (error) {
        console.error("Error fetching projects:", error);
        return []
    }
}

// get single project by id
export async function getProjectById(id) {
    try {
        await connectDB()
        const project = await Project.findById(id)
        if (!project) {
            return null
        }
        return JSON.parse(JSON.stringify(project))
    } catch (error) {
        console.error("Error fetching project:", error);
        return null
    }
}