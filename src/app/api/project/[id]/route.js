import Project from "@/model/Project";
import connectDB from "@/db/connectDB";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return Response.json({ success: false, message: "project not found" });
    }
    return Response.json({ success: true, project });
  } catch (error) {
    return Response.json({ success: false, message: "Server error" });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ success: false, message: "project ID is required" }), { status: 400 });
    }

    // Find the project first (without deleting yet)
    const project = await Project.findById(id);
    if (!project) {
      return new Response(JSON.stringify({ success: false, message: "project not found" }), { status: 404 });
    }

    // Delete images from Cloudinary
    if (project.project_image && project.project_image.length > 0) {
      for (let img of project.project_image) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    // Now delete the project from MongoDB
    await Project.findByIdAndDelete(id);

    return new Response(JSON.stringify({ success: true, message: "project deleted successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}


export async function PATCH(req,{params}) {
  try {
    await connectDB();
const { id } = params;
    const formData = await req.formData();
    // const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const duration = formData.get("duration");
    const proj_Link = formData.get("proj_Link");
    const github_code_link = formData.get("github_code_link");

    // Fetch current project
    const project = await Project.findById(id);
    if (!project) {
      return new Response(
        JSON.stringify({ success: false, message: "Project not found" }),
        { status: 404 }
      );
    }

    // Handle image update
    const imageFile = formData.get("project_image");
    let updatedImage = project.project_image; // Default: existing image

    if (imageFile && imageFile.size > 0) {
      // Delete old image from Cloudinary
      if (project.project_image?.public_id) {
        await cloudinary.uploader.destroy(project.project_image.public_id);
      }

      // Upload new image
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

      updatedImage = { url: result.secure_url, public_id: result.public_id };
    }

    // Update project
    const updatedFields = {
      title,
      description,
      duration,
      proj_Link,
      github_code_link,
      project_image: updatedImage
    };

    const updatedProject = await Project.findByIdAndUpdate(id, updatedFields, { new: true });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Project updated successfully",
        project: updatedProject,
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("PATCH /Project error:", error);
    console.log(error)
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Server error" }),
      { status: 500 }
    );
  }
}
