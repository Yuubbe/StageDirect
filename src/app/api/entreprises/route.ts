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

// New POST route to create an enterprise
export async function POST(req: NextRequest) {
  try {
    const {
      nom_entreprise,
      rue_entreprise,
      cp_entreprise,
      ville_entreprise,
      pays_entreprise,
      service_entreprise,
      tel_entreprise,
      fax_entreprise,
      email_entreprise,
      taille_entreprise,
      fk_id_activite,
      fk_id_contact,
      valider,
    } = await req.json(); // Get data from request body

    // Validate required fields
    if (!nom_entreprise || !ville_entreprise || !fk_id_activite) {
      return NextResponse.json(
        { message: "Nom, ville et ID d'activité requis" },
        { status: 400 }
      );
    }

    // Create a new enterprise
    const newEntreprise = await prisma.entreprise.create({
      data: {
        nom_entreprise,
        rue_entreprise,
        cp_entreprise,
        ville_entreprise,
        pays_entreprise: pays_entreprise || "France", // Default to France if not provided
        service_entreprise,
        tel_entreprise,
        fax_entreprise,
        email_entreprise,
        taille_entreprise,
        fk_id_activite,
        fk_id_contact,
        valider: valider || false, // Default to false if not provided
      },
    });

    return NextResponse.json(newEntreprise, { status: 201 }); // Return the created enterprise
  } catch (error) {
    console.error("Erreur lors de la création de l'entreprise:", error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création de l\'entreprise' },
      { status: 500 }
    );
  }
}
