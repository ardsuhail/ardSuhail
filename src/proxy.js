import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/Check_Token";
// 🔥 IMPORTANT: function ka naam 'proxy' rakhna hai, 'middleware' nahi
export async function proxy(request) {
  // ✅ Admin pages: Token + IP dono check karo
  const authAdmin = await getAdmin();

  if (!authAdmin) {
    return NextResponse.redirect(
      new URL("/this-page-does-not-exist", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
