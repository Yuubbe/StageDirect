import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// Gestion de la requête GET (récupérer les entreprises non validées)
export const GET = async (req: NextRequest) => {
  try {
    const entreprises = await prisma.entreprise.findMany({
      where: {
        valider: false, // Filtrer les entreprises non validées
      },
    });

    return NextResponse.json(entreprises); // Retourner les entreprises au format JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises", error);
    return NextResponse.json({ error: "Impossible de récupérer les entreprises." }, { status: 500 });
  }
};

// Gestion de la requête POST (ajouter une nouvelle entreprise)
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Récupérer les données envoyées dans la requête POST

    const { nom_entreprise, rue_entreprise, cp_entreprise, ville_entreprise, pays_entreprise, service_entreprise, tel_entreprise, fax_entreprise, email_entreprise, taille_entreprise, fk_id_activite, fk_id_contact, valider } = body;

    // Vérification des champs obligatoires
    if (!nom_entreprise || !ville_entreprise || !fk_id_activite) {
      return NextResponse.json({ error: "Les champs 'nom_entreprise', 'ville_entreprise' et 'fk_id_activite' sont requis." }, { status: 400 });
    }

    // Création d'une nouvelle entreprise
    const nouvelleEntreprise = await prisma.entreprise.create({
      data: {
        nom_entreprise,
        rue_entreprise,
        cp_entreprise,
        ville_entreprise,
        pays_entreprise: pays_entreprise || "France", // Valeur par défaut
        service_entreprise,
        tel_entreprise,
        fax_entreprise,
        email_entreprise,
        taille_entreprise,
        fk_id_activite,
        fk_id_contact,
        valider: valider || false, // Valeur par défaut
      },
    });

    return NextResponse.json(nouvelleEntreprise, { status: 201 }); // Retourner la nouvelle entreprise créée
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'entreprise", error);
    return NextResponse.json({ error: "Impossible d'ajouter l'entreprise." }, { status: 500 });
  }
};

// Gestion de la requête DELETE (supprimer une entreprise)
export const DELETE = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id_entreprise = url.searchParams.get("id_entreprise"); // Récupérer l'ID de l'entreprise à supprimer depuis les paramètres de l'URL

    if (!id_entreprise) {
      return NextResponse.json({ error: "L'ID de l'entreprise est requis." }, { status: 400 });
    }

    // Suppression de l'entreprise avec l'ID spécifié
    const entrepriseASupprimer = await prisma.entreprise.delete({
      where: {
        id_entreprise: parseInt(id_entreprise),
      },
    });

    return NextResponse.json(entrepriseASupprimer, { status: 200 }); // Retourner l'entreprise supprimée
  } catch (error) {
    console.error("Erreur lors de la suppression de l'entreprise", error);
    return NextResponse.json({ error: "Impossible de supprimer l'entreprise." }, { status: 500 });
  }
};

// Gestion de la requête PUT (valider ou refuser une entreprise)
export const PUT = async (req: NextRequest) => {
  try {
    const { id_entreprise, action } = await req.json(); // Récupérer l'ID de l'entreprise et l'action (valider ou refuser)

    if (!id_entreprise || !action) {
      return NextResponse.json({ error: "Les paramètres 'id_entreprise' et 'action' sont requis." }, { status: 400 });
    }

    // Mettre à jour l'entreprise avec l'ID spécifié en fonction de l'action (valider ou refuser)
    const entrepriseModifiee = await prisma.entreprise.update({
      where: {
        id_entreprise,
      },
      data: {
        valider: action === "valider" ? true : false,
      },
    });

    return NextResponse.json(entrepriseModifiee, { status: 200 }); // Retourner l'entreprise modifiée
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'entreprise", error);
    return NextResponse.json({ error: "Impossible de valider ou refuser l'entreprise." }, { status: 500 });
  }
};
