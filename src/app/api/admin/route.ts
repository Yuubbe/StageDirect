import { NextResponse } from "next/server"
import { PrismaClient, Role } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const utilisateurs = await prisma.utilisateur.findMany()
    return NextResponse.json(utilisateurs)
  } catch (_) {
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, role } = await req.json()

    // Liste des rôles autorisés
    const rolesAutorises = ["USER", "PROFESSEUR", "ADMIN", "SUPERADMIN"]
    if (!id || !role || !rolesAutorises.includes(role)) {
      return NextResponse.json({ error: "Rôle invalide" }, { status: 400 })
    }

    await prisma.utilisateur.update({
      where: { id },
      data: { role: role as Role }, // Type Prisma
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur API:", error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 })
  }
}
