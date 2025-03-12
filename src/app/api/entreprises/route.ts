import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assure-toi que ton instance Prisma est bien importée

// Fonction GET pour récupérer les entreprises
export async function GET() {
  try {
    const entreprises = await prisma.entreprise.findMany(); // Récupérer toutes les entreprises
    return NextResponse.json(entreprises);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Erreur inconnue';
    console.error("Erreur lors de la récupération des entreprises :", errorMessage);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Données reçues pour le stage:", data);

    // Convertir 'duree' en entier
    const duree = parseInt(data.duree, 10);
    if (isNaN(duree)) {
      throw new Error('La durée doit être un nombre entier');
    }

    // Convertir 'remuneration' en nombre (float)
    const remuneration = parseFloat(data.remuneration);
    if (isNaN(remuneration)) {
      throw new Error('La rémunération doit être un nombre');
    }

    // Création du stage dans la base de données
    const stage = await prisma.stage.create({
      data: {
        titre: data.titre,
        description: data.description,
        dateDebut: new Date(data.dateDebut), // Assurez-vous que les dates sont bien formatées
        dateFin: new Date(data.dateFin),
        duree, // Valeur convertie en entier
        remuneration, // Valeur convertie en float
        competences: data.competences,
        entrepriseId: data.entrepriseId,
        utilisateurId: data.utilisateurId, // Assurez-vous que cet ID est bien envoyé dans les données
      }
    });

    return NextResponse.json({ success: true, stage });
  } catch (error) {
    console.error("Erreur lors de l'insertion du stage:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
