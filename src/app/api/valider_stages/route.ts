import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// Gestion de la requête GET (récupérer les stages non validés)
export const GET = async (req: NextRequest) => {
  try {
    const stages = await prisma.stage.findMany({
      where: {
        valider: false, // Filtrer les stages non validés
      },
    });

    return NextResponse.json(stages); // Retourner les stages au format JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des stages", error);
    return NextResponse.json({ error: "Impossible de récupérer les stages." }, { status: 500 });
  }
};

// Gestion de la requête POST (ajouter un nouveau stage)
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Récupérer les données envoyées dans la requête POST

    const { intitulé, date, entrepriseId, contactId } = body;

    // Vérification des champs obligatoires
    if (!intitulé || !date || !contactId) {
      return NextResponse.json({ error: "Les champs 'intitulé', 'date' et 'contactId' sont requis." }, { status: 400 });
    }

    // Création d'un nouveau stage
    const nouveauStage = await prisma.stage.create({
      data: {
        intitulé,
        date: new Date(date), // Assurez-vous que la date est au format Date
        entrepriseId: entrepriseId || null, // Valeur par défaut
        contactId,
      },
    });

    return NextResponse.json(nouveauStage, { status: 201 }); // Retourner le nouveau stage créé
  } catch (error) {
    console.error("Erreur lors de l'ajout du stage", error);
    return NextResponse.json({ error: "Impossible d'ajouter le stage." }, { status: 500 });
  }
};

// Gestion de la requête DELETE (supprimer un stage)
export const DELETE = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id_stage = url.searchParams.get("id_stage"); // Récupérer l'ID du stage à supprimer depuis les paramètres de l'URL

    if (!id_stage) {
      return NextResponse.json({ error: "L'ID du stage est requis." }, { status: 400 });
    }

    // Suppression du stage avec l'ID spécifié
    const stageASupprimer = await prisma.stage.delete({
      where: {
        id: parseInt(id_stage), // Utiliser 'id' pour correspondre au modèle
      },
    });

    return NextResponse.json(stageASupprimer, { status: 200 }); // Retourner le stage supprimé
  } catch (error) {
    console.error("Erreur lors de la suppression du stage", error);
    return NextResponse.json({ error: "Impossible de supprimer le stage." }, { status: 500 });
  }
};

// Gestion de la requête PUT (valider ou refuser un stage)
export const PUT = async (req: NextRequest) => {
  try {
    const { id_stage, action } = await req.json(); // Récupérer l'ID du stage et l'action (valider ou refuser)

    if (!id_stage || !action) {
      return NextResponse.json({ error: "Les paramètres 'id_stage' et 'action' sont requis." }, { status: 400 });
    }

    // Mettre à jour le stage avec l'ID spécifié en fonction de l'action (valider ou refuser)
    const stageModifie = await prisma.stage.update({
      where: {
        id: parseInt(id_stage), // Utiliser 'id' pour correspondre au modèle
      },
      data: {
        valider: action === "valider", // Exemple de validation
      },
    });

    return NextResponse.json(stageModifie, { status: 200 }); // Retourner le stage modifié
  } catch (error) {
    console.error("Erreur lors de la mise à jour du stage", error);
    return NextResponse.json({ error: "Impossible de valider ou refuser le stage." }, { status: 500 });
  }
};
