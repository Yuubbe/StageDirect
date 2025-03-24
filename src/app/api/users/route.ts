import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { nom, prenom, email, role, password, etablissement } = await req.json();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.etudiant.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });
    }

    // Hacher le mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajouter un nouvel utilisateur avec un rôle
    const newUser = await prisma.etudiant.create({
      data: {
        nom,
        prenom,
        email,
        role,
        password: hashedPassword,
        etablissement,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un utilisateur :", error);
    return NextResponse.json({ error: "Erreur lors de l'ajout de l'utilisateur" }, { status: 500 });
  }
}
