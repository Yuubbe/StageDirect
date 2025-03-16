import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        entreprises: true, // Inclut les entreprises liées aux contacts
      },
      where: {
        AND: [
          {
            nom_contact: {
              not: {
                in: ["Mr", "ne marche pas"]
              }
            }
          }
        ]
      },
      distinct: ['nom_contact', 'tel_contact', 'email_contact'], // Évite les doublons basés sur ces champs
      orderBy: {
        nom_contact: 'asc' // Tri par ordre alphabétique
      }
    })
    return NextResponse.json(contacts, { status: 200 })
  } catch (error) {
    console.error("Erreur lors de la récupération des contacts :", error)
    return NextResponse.json({ error: "Impossible de récupérer les contacts" }, { status: 500 })
  }
}
