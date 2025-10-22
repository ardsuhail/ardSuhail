import connectDB from "@/db/connectDB";
import Project from "@/model/Project";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        await connectDB()
        const formData = await req.formData()
        const title = formData.get("title")
        const description = formData.get("description")
        const duration = formData.get("duration")
        const proj_Link = formData.get("proj_Link")
        const github_code_link = formData.get("github_code_link")
        const imageFile = formData.get("project_image")
        if (!title || !description || !duration || !proj_Link || !imageFile) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "All fields are Required"
            })
        }
        // Upload single image to Cloudinary
        const uploadedImages = [];

        // Upload single image to Cloudinary
        const buffer = Buffer.from(await imageFile.arrayBuffer());

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "projects" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(buffer);
        });

        const uploadedImage = {
            url: result.secure_url,
            public_id: result.public_id
        };



        const newProject = await Project.create({
            title,
            description,
            duration,
            proj_Link,
            github_code_link,
            project_image: {
                url: result.secure_url,
                public_id: result.public_id
            }
        })

        return NextResponse.json({
            success: true,
            error: false,
            message: "Project Created Successfully",
            newProject
        })
    } catch (error) {
        console.error(error)
        // console.log(error)
        return NextResponse.json({
            success: false,
            error: true,
            message: "Server Error Please Try Again Later"
        })
    }
}

export async function GET(req) {
    try {
        await connectDB()
        const projects = await Project.find().sort({ createdAt: -1 })
        return NextResponse.json({
            success: true,
            projects
        })
    } catch (error) {
        console.error(error)
        return NextResponse({
            success: false,
            error: true,
            message: "Server Error Please Try Again Later"
        })
    }
}