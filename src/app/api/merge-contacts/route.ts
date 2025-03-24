import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { contactId1, contactId2 } = await request.json()

    // Récupérer les deux contacts à fusionner
    const contact1 = await prisma.contact.findUnique({
      where: { id_contact: contactId1 },
      include: { entreprises: true },
    })

    const contact2 = await prisma.contact.findUnique({
      where: { id_contact: contactId2 },
      include: { entreprises: true },
    })

    if (!contact1 || !contact2) {
      return NextResponse.json({ error: "Contacts non trouvés" }, { status: 404 })
    }

    // Fusionner les entreprises, en évitant les doublons
    const mergedEntreprises = [
      ...contact1.entreprises,
      ...contact2.entreprises.filter(
        (e1) => !contact1.entreprises.some((e2) => e2.id_entreprise === e1.id_entreprise)
      ),
    ]

    // Mettre à jour le premier contact avec les entreprises fusionnées
    await prisma.contact.update({
      where: { id_contact: contactId1 },
      data: {
        entreprises: {
          connect: mergedEntreprises.map((e) => ({
            id_entreprise: e.id_entreprise,
          })),
        },
      },
    })

    // Supprimer le deuxième contact
    await prisma.contact.delete({
      where: { id_contact: contactId2 },
    })

    // Récupérer les contacts mis à jour
    const contacts = await prisma.contact.findMany({
      include: { entreprises: true },
    })

    return NextResponse.json(contacts, { status: 200 })
  } catch (error) {
    console.error("Erreur lors de la fusion des contacts :", error)
    return NextResponse.json({ error: "Impossible de fusionner les contacts" }, { status: 500 })
  }

