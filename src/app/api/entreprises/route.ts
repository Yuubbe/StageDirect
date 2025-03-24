"use server";
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Filtrer les entreprises validées si nécessaire
    const entreprises = await prisma.entreprise.findMany({
      where: { valider: true }, // Filtre uniquement les entreprises validées
    });

    // Si nécessaire, filtrer pour des entrées uniques basées sur 'id_entreprise'
    const uniqueEntreprises = Array.from(new Set(entreprises.map(e => e.id_entreprise)))
      .map(id => entreprises.find(e => e.id_entreprise === id));

    return NextResponse.json(uniqueEntreprises);
  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises:", error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des entreprises' },
      { status: 500 }
    );
  }
}
