// import AdminSignUp from "@/model/AdminSignUp";
// import connectDB from "@/db/connectDB";
// import { NextResponse } from "next/server";

// export async function GET(req, { params }) {
//     await connectDB();
//     const { id } = params;

//     try {
//         const admin = await AdminSignUp.findById(id);
//         if (!admin) {
//             return NextResponse.json({ success: false, message: "Admin not found" });
//         }

//         const { password, ...adminData } = admin._doc; // password hata do
//         return NextResponse.json({ success: true, admin: adminData });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ success: false, message: "Server error" });
//     }
// }
