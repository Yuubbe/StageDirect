import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    console.log("Token détecté dans le middleware :", token); // Ajoute ça
  
    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  
    return NextResponse.next();
  }
  
// Configurer le middleware pour qu'il s'applique uniquement à certaines routes
export const config = {
  matcher: ["/profile", "/dashboard/:path*"],
};
