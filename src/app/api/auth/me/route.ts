import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Fonction pour vérifier si l'utilisateur a le rôle requis
export async function checkUserRole(requiredRoles: string[]) {
  try {
    const cookieStore = await cookies()
    const userEmail = cookieStore.get("userEmail")?.value

    if (!userEmail) {
      return false
    }

    const user = await prisma.utilisateur.findUnique({
      where: { email: userEmail },
      select: { role: true }
    })

    if (!user) {
      return false
    }

    return requiredRoles.includes(user.role)
  } catch {
    return false
  }
}

export async function GET() {
  try {
    // Récupérer l'email depuis les cookies
    const cookieStore = await cookies()
    const userEmail = cookieStore.get("userEmail")?.value

    if (!userEmail) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    // Récupérer l'utilisateur et son rôle depuis la base de données
    const user = await prisma.utilisateur.findUnique({
      where: { email: userEmail },
      select: {
        id: true,
        email: true,
        role: true,
        nom: true,
        prenom: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    // Créer la réponse avec les cookies mis à jour
    const response = NextResponse.json(user)
    
    // Mettre à jour les cookies
    cookieStore.set("userRole", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 // 7 jours
    })

    return response
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
} 