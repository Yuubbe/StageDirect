import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Définition du type pour le corps de la requête
interface UpdateEtudiantBody {
  email?: string;
  password?: string;
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const id = Number(context.params.id);

  // Validation : Vérifier si l'ID est un nombre valide
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    // Extraction et validation du corps de la requête
    const body: UpdateEtudiantBody = await request.json();

    if (!body.email && !body.password) {
      return NextResponse.json({ error: "Aucune donnée à mettre à jour" }, { status: 400 });
    }

    const updatedData: Partial<UpdateEtudiantBody> = {};

    // Ajout de l'email si fourni
    if (body.email) updatedData.email = body.email;

    // Hachage du mot de passe si fourni
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      updatedData.password = hashedPassword;
    }

    // Mise à jour de l'étudiant
    const updatedEtudiant = await prisma.etudiant.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json(updatedEtudiant);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'étudiant :", error);

    // Gestion spécifique des erreurs Prisma (ex: id inexistant)
    if ((error as any).code === "P2025") {
      return NextResponse.json({ error: "Étudiant non trouvé" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Échec de la mise à jour de l'étudiant" },
      { status: 500 }
    );
  }
}
