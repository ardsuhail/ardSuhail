import connectDB from "@/db/connectDB";
import Project from "@/model/Project";
import { NextResponse } from "next/server";

// ========== HELPER FUNCTIONS ==========

// Validate required fields (naye schema ke according)
const validateProjectData = (data) => {
    const required = ['title', 'description', 'shortDescription', 'duration', 'proj_Link', 'category'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
        return {
            isValid: false,
            message: `Missing required fields: ${missing.join(', ')}`
        };
    }
    return { isValid: true };
};

// Helper to parse JSON fields from FormData
const parseJSONField = (value) => {
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

// ========== MAIN API HANDLERS ==========

// POST - Create new project (sare fields ke saath)
export async function POST(req) {
    try {
        // 1. Connect to database
        await connectDB();
        
        // 2. Get form data
        const formData = await req.formData();
        
        // 3. Extract basic fields
        const title = formData.get("title")
        const description = formData.get("description")
        const shortDescription = formData.get("shortDescription")
        const duration = formData.get("duration")
        const proj_Link = formData.get("proj_Link")
        const github_code_link = formData.get("github_code_link") || ""
        const imageUrl = formData.get("imageUrl")
        const category = formData.get("category")
        
        // 4. Extract JSON/Array fields
        const techStack = parseJSONField(formData.get("techStack"))
        const features = parseJSONField(formData.get("features"))
        const gallery_images = parseJSONField(formData.get("gallery_images"))
        const status = formData.get("status") || "completed"
        const difficulty = formData.get("difficulty") || "intermediate"
        const isFeatured = formData.get("isFeatured") === "true"
        
        // Optional fields
        const startDate = formData.get("startDate")
        const endDate = formData.get("endDate")
        const teamSize = formData.get("teamSize") ? parseInt(formData.get("teamSize")) : 1
        const teamMembers = parseJSONField(formData.get("teamMembers"))
        const demoVideoUrl = formData.get("demoVideoUrl") || ""
        
        // Challenges (JSON object)
        const challenges = parseJSONField(formData.get("challenges"))
        
        // SEO (JSON object)
        const seo = parseJSONField(formData.get("seo"))
        
        // Testimonials (JSON array)
        const testimonials = parseJSONField(formData.get("testimonials"))
        
        // 5. Validate required fields
        const validation = validateProjectData({
            title, description, shortDescription, duration, proj_Link, category
        });
        
        if (!validation.isValid) {
            return NextResponse.json({
                success: false,
                error: true,
                message: validation.message
            }, { status: 400 });
        }
        
        // 6. Check if image exists
        if (!imageUrl) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Project image is required"
            }, { status: 400 });
        }
        
        // 7. Create project in database (sare fields ke saath)
        const newProject = await Project.create({
            title,
            description,
            shortDescription,
            duration,
            proj_Link,
            github_code_link,
            project_image: {
                url: imageUrl,
                public_id: imageUrl.split('/').pop()
            },
            gallery_images: gallery_images || [],
            techStack: techStack || [],
            features: features || [],
            challenges: challenges || {},
            status,
            category,
            difficulty,
            startDate: startDate || null,
            endDate: endDate || null,
            teamSize,
            teamMembers: teamMembers || [],
            seo: seo || {},
            views: 0,
            likes: 0,
            isFeatured,
            order: formData.get("order") ? parseInt(formData.get("order")) : 0,
            demoVideoUrl,
            testimonials: testimonials || []
        });
        
        // 8. Return success response
        return NextResponse.json({
            success: true,
            error: false,
            message: "Project created successfully! 🎉",
            data: newProject
        }, { status: 201 });
        
    } catch (error) {
        console.error("Error in POST /api/projects:", error);
        
        return NextResponse.json({
            success: false,
            error: true,
            message: error.message || "Internal server error. Please try again later."
        }, { status: 500 });
    }
}

// GET - Fetch all projects (filtering ke saath)
export async function GET(req) {
    try {
        await connectDB();
        
        // Get query parameters for filtering
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const status = searchParams.get('status');
        const isFeatured = searchParams.get('featured');
        const search = searchParams.get('search');
        
        // Build filter object
        let filter = {};
        
        if (category && category !== 'all') {
            filter.category = category;
        }
        
        if (status && status !== 'all') {
            filter.status = status;
        }
        
        if (isFeatured === 'true') {
            filter.isFeatured = true;
        }
        
        // Search functionality
        if (search) {
            filter.$text = { $search: search };
        }
        
        // Fetch projects with filters
        let query = Project.find(filter);
        
        // Apply sorting
        query = query.sort({ isFeatured: -1, order: 1, createdAt: -1 });
        
        const projects = await query;
        
        return NextResponse.json({
            success: true,
            error: false,
            count: projects.length,
            filters: { category, status, featured: isFeatured, search },
            data: projects
        });
        
    } catch (error) {
        console.error("Error in GET /api/projects:", error);
        return NextResponse.json({
            success: false,
            error: true,
            message: "Failed to fetch projects"
        }, { status: 500 });
    }
}