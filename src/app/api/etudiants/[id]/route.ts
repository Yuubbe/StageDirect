import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const body = await request.json()

  try {
    const updatedEtudiant = await prisma.etudiant.update({
      where: { id },
      data: {
        nom: body.nom,
        prenom: body.prenom,
        email: body.email,
        etablissement: body.etablissement,
        niveau: body.niveau,
      },
    })

    return NextResponse.json(updatedEtudiant)
  } catch (error) {
    console.error("Error updating student:", error)
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 })
  }
}

