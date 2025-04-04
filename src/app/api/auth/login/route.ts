import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { email },
    });

    if (!utilisateur) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier le mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, utilisateur.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Mot de passe incorrect" },
        { status: 400 }
      );
    }

    // Ne pas renvoyer le mot de passe dans la réponse
    const { password: _, ...userWithoutPassword } = utilisateur;

    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return NextResponse.json(
      { message: "Erreur interne" },
      { status: 500 }
    );
  }
}