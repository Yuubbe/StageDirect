import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { use } from "react"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const stage = await prisma.stage.findUnique({
      where: {
        id: parseInt(resolvedParams.id),
      },
      include: {
        entreprise: true,
        contact: true,
      },
    })

    if (!stage) {
      return NextResponse.json(
        { error: "Stage non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json(stage)
  } catch (error) {
    console.error("Erreur lors de la récupération du stage:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération du stage" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const body = await request.json()
    
    // Formater la date en ajoutant l'heure (midi) pour avoir un format DateTime valide
    const formattedDate = new Date(body.date)
    formattedDate.setHours(12, 0, 0, 0)

    const stage = await prisma.stage.update({
      where: {
        id: parseInt(resolvedParams.id),
      },
      data: {
        intitulé: body.intitulé,
        date: formattedDate.toISOString(),
        entrepriseId: body.entreprise.id,
        contactId: body.contact.id,
      },
      include: {
        entreprise: true,
        contact: true,
      },
    })

    return NextResponse.json(stage)
  } catch (error) {
    console.error("Erreur lors de la mise à jour du stage:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du stage" },
      { status: 500 }
    )
  }
} 