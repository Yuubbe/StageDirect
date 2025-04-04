// src/app/api/entreprises/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// Fonction de normalisation avancée
const normalizeString = (str: string) => {
  let normalized = str.trim().toLowerCase();

  // Substituer des mots clés courants ou des abréviations
  normalized = normalized.replace(/\bndlp\b/g, "notre dame la providence");
  normalized = normalized.replace(/\bnd\b/g, "notre dame");
  normalized = normalized.replace(/\blycée\b/g, "école");
  normalized = normalized.replace(/\bprovidence\b/g, "nd la providence");

  // Enlever les accents (si nécessaire pour une recherche plus souple)
  normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return normalized;
};

// Fonction de recherche avec normalisation des noms
export async function GET(req: NextRequest) {
  try {
    const searchTerm = req.nextUrl.searchParams.get('searchTerm');  // Récupérer le terme de recherche depuis l'URL

    // Récupérer toutes les entreprises
    const entreprises = await prisma.entreprise.findMany();

    // Normaliser le terme de recherche
    const normalizedSearchTerm = normalizeString(searchTerm || "");

    // Filtrer les entreprises en fonction des noms similaires (après normalisation)
    const filteredEntreprises = entreprises.filter((entreprise) => {
      const normalizedNom = normalizeString(entreprise.nom_entreprise);
      
      // Vérifier si les noms sont identiques après normalisation
      return normalizedNom === normalizedSearchTerm;
    });

    // Trier les entreprises par nom après filtrage
    const sortedEntreprises = filteredEntreprises.sort((a, b) => a.nom_entreprise.localeCompare(b.nom_entreprise));

    return NextResponse.json(sortedEntreprises);
  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises:", error);
    return NextResponse.json({ error: 'Erreur serveur lors de la récupération des entreprises' }, { status: 500 });
  }
}