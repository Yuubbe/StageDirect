// app/middleware.ts

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Chercher le token dans les cookies
  const token = req.cookies.get("token");

  // Si le token est absent, rediriger vers /unauthorized
  if (!token) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décoder le token JWT
    // Vérifier si le rôle de l'utilisateur est SUPERADMIN
    if (decodedToken.role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    
    // Si le rôle est SUPERADMIN, continuer avec la requête
    return NextResponse.next();
  } catch (err) {
    console.error("Erreur de décodage du token :", err);
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
}

// Appliquer ce middleware uniquement sur les pages d'administration
export const config = {
  matcher: ["/admin/*"], // ou ici le chemin que tu utilises pour la page admin
};
