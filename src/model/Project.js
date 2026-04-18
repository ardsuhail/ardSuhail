import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true  // search ke liye
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {  // NEW - card preview ke liye
        type: String,
        required: true,
        maxlength: 160  // SEO friendly
    },
    duration: {
        type: String,
        required: true
    },
    proj_Link: {
        type: String,
        required: true
    },
    github_code_link: {
        type: String,
        // required: true
    },
    project_image: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    
    // ========== YAHAN SE NAYE FIELDS ==========
    
    // 1. Multiple Images (Gallery ke liye)
    gallery_images: [{
        url: { type: String },
        public_id: { type: String }
    }],
    
    // 2. Tech Stack (More Detailed)
    techStack: [{
        name: { type: String },        // "React", "Next.js"
        icon: { type: String },        // Icon name or URL
        version: { type: String }      // Optional version info
    }],
    
    // 3. Project Features (Bullet points)
    features: [{
        type: String,
        required: false
    }],
    
    // 4. Challenges Faced & Solutions
    challenges: {
        problem: { type: String },
        solution: { type: String }
    },
    
    // 5. Project Status
    status: {
        type: String,
        enum: ['completed', 'in-progress', 'planned', 'on-hold'],
        default: 'completed'
    },
    
    // 6. Category/Type
    category: {
        type: String,
        enum: ['fullstack', 'frontend', 'backend', 'ecommerce', 'mobile', 'ai-ml', 'other'],
        required: true,
        default: 'other'
    },
    
    // 7. Difficulty Level
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'intermediate'
    },
    
    // 8. Date Related
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    
    // 9. Team Info (if group project)
    teamSize: {
        type: Number,
        default: 1
    },
    teamMembers: [{
        name: String,
        role: String,
        github: String
    }],
    
    // 10. SEO & Meta
    seo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String]
    },
    
    // 11. Engagement Metrics
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    
    // 12. Featured Project
    isFeatured: {
        type: Boolean,
        default: false
    },
    
    // 13. Sorting/Order
    order: {
        type: Number,
        default: 0
    },
    
    // 14. Video Demo (Optional)
    demoVideoUrl: {
        type: String  // YouTube or Vimeo link
    },
    
    // 15. Testimonials (if client project)
    testimonials: [{
        clientName: String,
        clientRole: String,
        feedback: String,
        rating: { type: Number, min: 1, max: 5 }
    }]

}, {
    timestamps: true
});

// Indexes for better query performance
ProjectSchema.index({ title: 'text', description: 'text' });  // Text search
ProjectSchema.index({ category: 1, status: 1 });  // Filtering
ProjectSchema.index({ isFeatured: -1, order: 1 });  // Featured sorting

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);