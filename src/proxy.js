// import { NextResponse } from 'next/server'

// const ALLOWED_IPS = process.env.ALLOWED_IPS?.split(',').map(ip => ip.trim()) || [
//   'YOUR.IP.ADD.RESS',
// ]
// function getClientIp(request) {
//   return (
//     request.ip ||
//     request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
//     request.headers.get('x-real-ip') ||
//     ''
//   )
// }
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//  const clientIp = getClientIp(request)
//   if (!ALLOWED_IPS.includes(clientIp)) {
//     return NextResponse.redirect(new URL('/', request.url))
//   }
  

//   const loginToken = request.cookies.get("token")?.value;
  
//     if (!loginToken) {
  
//         return NextResponse.redirect(new URL('/', request.url))
//     }
 
//     // return NextResponse.json({message:"hellow this is a simple json"})
//       return NextResponse.next();
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/admin/:path*','/login','/api/login'],
// }
import { NextResponse } from 'next/server'

// JSON array format ke liye
const ALLOWED_IPS = (() => {
    try {
        const ips = JSON.parse(process.env.ALLOWED_IPS || '[]');
        return Array.isArray(ips) ? ips : [];
    } catch {
        return [];
    }
})();

function getClientIp(request) {
    return (
        request.ip ||
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        ''
    )
}

// 🔥 IMPORTANT: function ka naam 'proxy' rakhna hai, 'middleware' nahi
export function proxy(request) {
    const clientIp = getClientIp(request);
    const pathname = request.nextUrl.pathname;
    
    // ✅ Login page: sirf IP check karo, token check mat karo
    if (pathname === '/login' || pathname === '/api/login') {
        if (ALLOWED_IPS.length > 0 && !ALLOWED_IPS.includes(clientIp)) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }
    
    // ✅ Admin pages: Token + IP dono check karo
    const loginToken = request.cookies.get("token")?.value;
    
    if (!loginToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    if (ALLOWED_IPS.length > 0 && !ALLOWED_IPS.includes(clientIp)) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*', '/login', '/api/login'],
}