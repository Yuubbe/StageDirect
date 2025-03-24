"use server";
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const entreprises = await prisma.entreprise.findMany();
    
    // Trouver les doublons en fonction de 'id_entreprise'
    const entrepriseCount = entreprises.reduce((acc: Record<number, number>, entreprise) => {
      acc[entreprise.id_entreprise] = (acc[entreprise.id_entreprise] || 0) + 1;
      return acc;
    }, {});
    
    const doublons = entreprises.filter((entreprise) => entrepriseCount[entreprise.id_entreprise] > 1);
    
    // Filtrer les entreprises uniques
    const uniqueEntreprises = Array.from(new Set(entreprises.map(e => e.id_entreprise)))
      .map(id => entreprises.find(e => e.id_entreprise === id));

    return NextResponse.json({ uniqueEntreprises, doublons });
  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises:", error);
    return NextResponse.json({ error: 'Erreur serveur lors de la récupération des entreprises' }, { status: 500 });
  }
}
