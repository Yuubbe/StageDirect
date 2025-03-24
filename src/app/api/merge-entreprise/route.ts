import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { entrepriseId1, entrepriseId2 } = await request.json();

    // Récupérer les deux entreprises à fusionner
    const entreprise1 = await prisma.entreprise.findUnique({
      where: { id_entreprise: entrepriseId1 },
    });

    const entreprise2 = await prisma.entreprise.findUnique({
      where: { id_entreprise: entrepriseId2 },
    });

    if (!entreprise1 || !entreprise2) {
      return NextResponse.json({ error: "Entreprises non trouvées" }, { status: 404 });
    }

    // Fusionner les données en conservant les informations non nulles
    const mergedEntreprise = {
      nom_entreprise: entreprise1.nom_entreprise || entreprise2.nom_entreprise,
      rue_entreprise: entreprise1.rue_entreprise || entreprise2.rue_entreprise,
      cp_entreprise: entreprise1.cp_entreprise || entreprise2.cp_entreprise,
      ville_entreprise: entreprise1.ville_entreprise || entreprise2.ville_entreprise,
      pays_entreprise: entreprise1.pays_entreprise || entreprise2.pays_entreprise,
      service_entreprise: entreprise1.service_entreprise || entreprise2.service_entreprise,
      tel_entreprise: entreprise1.tel_entreprise || entreprise2.tel_entreprise,
      fax_entreprise: entreprise1.fax_entreprise || entreprise2.fax_entreprise,
      email_entreprise: entreprise1.email_entreprise || entreprise2.email_entreprise,
      taille_entreprise: entreprise1.taille_entreprise || entreprise2.taille_entreprise,
      fk_id_activite: entreprise1.fk_id_activite || entreprise2.fk_id_activite,
      fk_id_contact: entreprise1.fk_id_contact || entreprise2.fk_id_contact,
      valider: entreprise1.valider || entreprise2.valider,
    };

    // Mettre à jour la première entreprise avec les données fusionnées
    await prisma.entreprise.update({
      where: { id_entreprise: entrepriseId1 },
      data: mergedEntreprise,
    });

    // Supprimer la deuxième entreprise
    await prisma.entreprise.delete({
      where: { id_entreprise: entrepriseId2 },
    });

    // Récupérer les entreprises mises à jour
    const entreprises = await prisma.entreprise.findMany();

    return NextResponse.json(entreprises, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la fusion des entreprises :", error);
    return NextResponse.json({ error: "Impossible de fusionner les entreprises" }, { status: 500 });
  }
}
