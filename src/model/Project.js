import mongoose from "mongoose";
const ProjectSchema=new mongoose.Schema({
    title:{
       type:String,
       required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    proj_Link:{
        type:String,
        required:true
    },
    github_code_link:{
        type:String,
        // required:true
    },
     project_image:{
            url: { type: String, required: true },
            public_id: { type: String, required: true }
        },
},{timestamps:true})
export default mongoose.models.Project ||mongoose.model("Project",ProjectSchema);