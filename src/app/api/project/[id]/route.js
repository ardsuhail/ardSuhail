// import Project from "@/model/Project";
// import connectDB from "@/db/connectDB";
// import { v2 as cloudinary } from "cloudinary";
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function GET(req, { params }) {
//   await connectDB();
//   const { id } =await params;
//   try {
//     const project = await Project.findById(id);
//     if (!project) {
//       return Response.json({ success: false, message: "project not found" });
//     }
//     return Response.json({ success: true, project });
//   } catch (error) {
//     return Response.json({ success: false, message: "Server error" });
//   }
// }

// export async function DELETE(req, { params }) {
//   try {
//     await connectDB();
//     const { id } = params;
//     if (!id) {
//       return new Response(JSON.stringify({ success: false, message: "project ID is required" }), { status: 400 });
//     }

//     // Find the project first (without deleting yet)
//     const project = await Project.findById(id);
//     if (!project) {
//       return new Response(JSON.stringify({ success: false, message: "project not found" }), { status: 404 });
//     }

//     // Delete images from Cloudinary
//     if (project.project_image && project.project_image.length > 0) {
//       for (let img of project.project_image) {
//         if (img.public_id) {
//           await cloudinary.uploader.destroy(img.public_id);
//         }
//       }
//     }

//     // Now delete the project from MongoDB
//     await Project.findByIdAndDelete(id);

//     return new Response(JSON.stringify({ success: true, message: "project deleted successfully" }), { status: 200 });
//   } catch (err) {
//     return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
//   }
// }


// export async function PATCH(req,{params}) {
//   try {
//     await connectDB();
// const { id } = params;
//     const formData = await req.formData();
//     // const id = formData.get("id");
//     const title = formData.get("title");
//     const description = formData.get("description");
//     const duration = formData.get("duration");
//     const proj_Link = formData.get("proj_Link");
//     const github_code_link = formData.get("github_code_link");

//     // Fetch current project
//     const project = await Project.findById(id);
//     if (!project) {
//       return new Response(
//         JSON.stringify({ success: false, message: "Project not found" }),
//         { status: 404 }
//       );
//     }

//     // Handle image update
//     const imageFile = formData.get("project_image");
//     let updatedImage = project.project_image; // Default: existing image

//     if (imageFile && imageFile.size > 0) {
//       // Delete old image from Cloudinary
//       if (project.project_image?.public_id) {
//         await cloudinary.uploader.destroy(project.project_image.public_id);
//       }

//       // Upload new image
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       const result = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "projects" },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );
//         stream.end(buffer);
//       });

//       updatedImage = { url: result.secure_url, public_id: result.public_id };
//     }

//     // Update project
//     const updatedFields = {
//       title,
//       description,
//       duration,
//       proj_Link,
//       github_code_link,
//       project_image: updatedImage
//     };

//     const updatedProject = await Project.findByIdAndUpdate(id, updatedFields, { new: true });

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Project updated successfully",
//         project: updatedProject,
//       }),
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("PATCH /Project error:", error);
//     console.log(error)
//     return new Response(
//       JSON.stringify({ success: false, message: error.message || "Server error" }),
//       { status: 500 }
//     );
//   }
// }
// src/app/api/project/[id]/route.js
export const revalidate = 360000; // Cache for 4 days (360000 seconds) - adjust as needed
import Project from "@/model/Project";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

// ========== HELPER FUNCTIONS ==========

// Delete single image from R2 (optional - R2 mein direct delete nahi hota easily)
// R2 mein delete karne ke liye extra API call chahiye, isliye hum sirf database se remove karte hain

// ========== GET - Fetch single project ==========
export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        
        // Find project by ID
        const project = await Project.findById(id);
        
        if (!project) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Project not found"
            }, { status: 404 });
        }
        
        return NextResponse.json({
            success: true,
            error: false,
            data: project
        }, { status: 200 });
        
    } catch (error) {
        console.error("Error in GET /api/project/[id]:", error);
        
        return NextResponse.json({
            success: false,
            error: true,
            message: error.message || "Server error"
        }, { status: 500 });
    }
}

// ========== DELETE - Delete single project ==========
export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        
        // Check if ID is provided
        if (!id) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Project ID is required"
            }, { status: 400 });
        }
        
        // Find project first
        const project = await Project.findById(id);
        
        if (!project) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Project not found"
            }, { status: 404 });
        }
        
        // Note: R2 images automatically delete nahi hoti, optional hai
        // Agar R2 se image delete karni hai toh alag API call karni padegi
        
        // Delete project from database
        await Project.findByIdAndDelete(id);
        
        return NextResponse.json({
            success: true,
            error: false,
            message: "Project deleted successfully 🗑️"
        }, { status: 200 });
        
    } catch (error) {
        console.error("Error in DELETE /api/project/[id]:", error);
        
        return NextResponse.json({
            success: false,
            error: true,
            message: error.message || "Server error"
        }, { status: 500 });
    }
}

// ========== PATCH - Update single project ==========
export async function PATCH(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        
        // Check if ID is provided
        if (!id) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Project ID is required"
            }, { status: 400 });
        }
        
        // Find existing project
        const existingProject = await Project.findById(id);
        
        if (!existingProject) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Project not found"
            }, { status: 404 });
        }
        
        // Get form data
        const formData = await req.formData();
        
        // Prepare update object
        const updateData = {};
        
        // Simple fields (text inputs)
        const simpleFields = ['title', 'description', 'shortDescription', 'duration', 
                              'proj_Link', 'github_code_link', 'category', 'status', 
                              'difficulty', 'demoVideoUrl'];
        
        simpleFields.forEach(field => {
            const value = formData.get(field);
            if (value !== null && value !== undefined && value !== "") {
                updateData[field] = value;
            }
        });
        
        // Boolean fields
        const isFeatured = formData.get("isFeatured");
        if (isFeatured !== null) {
            updateData.isFeatured = isFeatured === "true";
        }
        
        // Number fields
        const teamSize = formData.get("teamSize");
        if (teamSize !== null && teamSize !== "") {
            updateData.teamSize = parseInt(teamSize);
        }
        
        const order = formData.get("order");
        if (order !== null && order !== "") {
            updateData.order = parseInt(order);
        }
        
        // JSON/Array fields
        const techStack = formData.get("techStack");
        if (techStack && techStack !== "") {
            try {
                updateData.techStack = JSON.parse(techStack);
            } catch (e) {
                // If not JSON, treat as single string
                updateData.techStack = [{ name: techStack, icon: techStack }];
            }
        }
        
        const features = formData.get("features");
        if (features && features !== "") {
            try {
                updateData.features = JSON.parse(features);
            } catch (e) {
                updateData.features = [features];
            }
        }
        
        const challenges = formData.get("challenges");
        if (challenges && challenges !== "") {
            try {
                updateData.challenges = JSON.parse(challenges);
            } catch (e) {
                updateData.challenges = { problem: challenges, solution: "" };
            }
        }
        
        const teamMembers = formData.get("teamMembers");
        if (teamMembers && teamMembers !== "") {
            try {
                updateData.teamMembers = JSON.parse(teamMembers);
            } catch (e) {
                updateData.teamMembers = [];
            }
        }
        
        const seo = formData.get("seo");
        if (seo && seo !== "") {
            try {
                updateData.seo = JSON.parse(seo);
            } catch (e) {
                updateData.seo = {};
            }
        }
        
        const testimonials = formData.get("testimonials");
        if (testimonials && testimonials !== "") {
            try {
                updateData.testimonials = JSON.parse(testimonials);
            } catch (e) {
                updateData.testimonials = [];
            }
        }
        
        const gallery_images = formData.get("gallery_images");
        if (gallery_images && gallery_images !== "") {
            try {
                updateData.gallery_images = JSON.parse(gallery_images);
            } catch (e) {
                updateData.gallery_images = [];
            }
        }

        const demoVideoUrls = formData.get("demoVideoUrls");
        if (demoVideoUrls && demoVideoUrls !== "") {
            try {
                updateData.demoVideoUrls = JSON.parse(demoVideoUrls);
            } catch (e) {
                updateData.demoVideoUrls = [];
            }
        } else {
            const singleDemoVideoUrl = formData.get("demoVideoUrl");
            if (singleDemoVideoUrl && singleDemoVideoUrl !== "") {
                updateData.demoVideoUrls = [singleDemoVideoUrl];
            }
        }
        
        // Date fields
        const startDate = formData.get("startDate");
        if (startDate && startDate !== "") {
            updateData.startDate = new Date(startDate);
        }
        
        const endDate = formData.get("endDate");
        if (endDate && endDate !== "") {
            updateData.endDate = new Date(endDate);
        }
        
        // Handle image update (R2 URL)
        const newImageUrl = formData.get("imageUrl");
        if (newImageUrl && newImageUrl !== "") {
            updateData.project_image = {
                url: newImageUrl,
                public_id: newImageUrl.split('/').pop()
            };
        }
        
        // Update project in database
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            updateData,
            { 
                new: true,  // Return updated document
                runValidators: true  // Run schema validation
            }
        );
        
        return NextResponse.json({
            success: true,
            error: false,
            message: "Project updated successfully ✅",
            data: updatedProject
        }, { status: 200 });
        
    } catch (error) {
        console.error("Error in PATCH /api/project/[id]:", error);
        
        return NextResponse.json({
            success: false,
            error: true,
            message: error.message || "Server error"
        }, { status: 500 });
    }
}