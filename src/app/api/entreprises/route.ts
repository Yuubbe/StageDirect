import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const entreprises = await prisma.entreprise.findMany({
      where: { valider: true }, // Filtre uniquement les entreprises validées
    });

    return NextResponse.json(entreprises);
  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises:", error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des entreprises' },
      { status: 500 }
    );
  }
}
