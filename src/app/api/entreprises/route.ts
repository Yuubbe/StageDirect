"use server";
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const entreprises = await prisma.entreprise.findMany();
    
    // Assuming you want to filter for unique entries based on a property, e.g., 'id_entreprise'
    const uniqueEntreprises = Array.from(new Set(entreprises.map(e => e.id_entreprise)))
      .map(id => entreprises.find(e => e.id_entreprise === id));

    return NextResponse.json(uniqueEntreprises);
  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises:", error);
    return NextResponse.json({ error: 'Erreur serveur lors de la récupération des entreprises' }, { status: 500 });
  }
}