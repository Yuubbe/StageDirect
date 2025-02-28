import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, prenom, email, password, etablissement, niveau } = body;

    if (!nom || !prenom || !email || !password || !etablissement || !niveau) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.etudiant.findUnique({ where: { email } });


    if (existingUser) {
      return NextResponse.json({ error: "Cet email est déjà utilisé." }, { status: 400 });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'étudiant en base
    const newEtudiant = await prisma.etudiant.create({
      data: { nom, prenom, email, password: hashedPassword, etablissement, niveau },
    });

    return NextResponse.json(newEtudiant, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json({ error: "Erreur lors de l'inscription." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
