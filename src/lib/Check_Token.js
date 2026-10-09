import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function getAdmin() {
  try {
    const cookiesStored = await cookies();
    const token = await cookiesStored.get("token")?.value;

    if (!token) {
      return null;
    }
    const admin = await jwt.verify(token, process.env.JWT_SECRET);

    return admin;
  } catch (error) {
    return null;
  }
}
