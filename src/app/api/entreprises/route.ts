import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assure-toi que ton instance Prisma est bien importée

export async function POST(req: Request) {
  try {
    const data = await req.json();
console.log("Données reçues :", data);

const entreprise = await prisma.entreprise.create({
  data: {
    nom: data.nom,
    siret: data.siret,  // Assurez-vous que ce champ est présent dans le schéma Prisma
    secteur: data.secteur,
    adresse: data.adresse,
    code_postal: data.code_postal,
    ville: data.ville,
    site_web: data.site_web,
    description: data.description,
    contact_nom: data.contact_nom,
    contact_email: data.contact_email,
    contact_telephone: data.contact_telephone,
  }
});

    console.log("Données reçues :", data);


    return NextResponse.json({ success: true, entreprise });
  } catch (error) {
    console.error("Erreur lors de l'insertion :", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    
  }
}

