import mongoose from "mongoose";
const AdminSignupSchema=new mongoose.Schema({
    username:{
       type:String,
       required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
     resetOtp: {
    type: Number,
    default: null,
  },
  resetOtpExpire: {
    type: Date,
    default: null,
  },
},{timestamps:true})
export default mongoose.models.AdminSignup ||mongoose.model("AdminSignup",AdminSignupSchema);