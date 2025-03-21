import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        entreprises: true, // Inclut les entreprises liées aux contacts
      }
    })
    return NextResponse.json(contacts, { status: 200 })
  } catch (error) {
    console.error("Erreur lors de la récupération des contacts :", error)
    return NextResponse.json({ error: "Impossible de récupérer les contacts" }, { status: 500 })
  }
}
