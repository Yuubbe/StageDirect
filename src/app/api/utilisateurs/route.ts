import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { nom, prenom, email, password, etablissement, niveau, role } = await request.json();

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Un utilisateur avec cet email existe déjà" },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur dans la base de données
    const utilisateur = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        password: hashedPassword,
        etablissement,
        role: role || "USER" // Utiliser USER comme valeur par défaut si non spécifié
      }
    });

    // Ne pas renvoyer le mot de passe dans la réponse
    const { password: _, ...userWithoutPassword } = utilisateur;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    return NextResponse.json(
      { message: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}