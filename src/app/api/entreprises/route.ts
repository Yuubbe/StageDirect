// src/app/api/entreprises/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const entreprises = await prisma.entreprise.findMany();

    // Filtrer les doublons par nom et ville (ajustez selon vos critères)
    const uniqueEntreprises = Array.from(
      new Map(
        entreprises.map((entreprise) => [
          `${entreprise.nom_entreprise}-${entreprise.ville_entreprise}`, entreprise
        ])
      ).values()
    );

    return NextResponse.json(uniqueEntreprises);
  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises:", error);
    return NextResponse.json({ error: 'Erreur serveur lors de la récupération des entreprises' }, { status: 500 });
  }
}