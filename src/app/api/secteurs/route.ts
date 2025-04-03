import { NextResponse } from "next/server";
// Utilisez l'importation par défaut de Prisma
import prisma from '../../../lib/prisma'; // Assurez-vous que votre PrismaClient est bien importé

// Méthode GET pour récupérer les secteurs
export async function GET() {
  try {
    const secteurs = await prisma.secteur_activite.findMany();
    return NextResponse.json(secteurs);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des secteurs." }, { status: 500 });
  }
}

// Méthode POST pour créer un nouveau secteur
export async function POST(request: Request) {
  try {
    const { libelle_activite } = await request.json();
    const secteur = await prisma.secteur_activite.create({
      data: {
        libelle_activite,
      },
    });
    return NextResponse.json(secteur, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création du secteur." }, { status: 500 });
  }
}
