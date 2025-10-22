import AdminSignUp from "@/model/AdminSignUp";
import connectDB from "@/db/connectDB";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        await connectDB()
        const body = await req.json()
        const { username, email, password } = body
        if (!username || !email || !password) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "All fields are required"
            })
        }

        const existinguser = await AdminSignUp.findOne({ email })
        if (existinguser) {
            return Response.json({ success: false, error: true, message: "Admin Already Exists please choose different Adminname and email" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const admin = await AdminSignUp.create({
            username,
            email,
            password: hashedPassword
        })

        return NextResponse.json({
            success: true,
            error: false,
            message: "Signup Successfully",
            admin
        })

    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            error: true,
            message: "Server Error Please check browser Console for more info or try Again later OR "
        })
    }
}



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

export async function GET() {
  try {
    await connectDB();

    const admins = await AdminSignUp.find().sort({ createdAt: -1 });

    // Password remove karo har admin se
    const safeAdmins = admins.map((admin) => {
      const { password, ...adminData } = admin._doc;
      return adminData;
    });

    return NextResponse.json({
      success: true,
      admins: safeAdmins,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: true,
      message: "Server Error Please Try Again Later",
    });
  }
}
