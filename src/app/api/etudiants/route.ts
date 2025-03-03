import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Interface pour typer les données d'inscription
interface EtudiantData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  etablissement: string;
  niveau: string;
}

// ➤ Créer un nouvel étudiant (POST)
export async function POST(req: Request) {
  try {
    const body: EtudiantData = await req.json();
    const { nom, prenom, email, password, etablissement, niveau } = body;

    // ✅ Validation des champs requis
    if (!nom || !prenom || !email || !password || !etablissement || !niveau) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    // ✅ Vérifier si l'email est déjà utilisé
    const existingUser = await prisma.etudiant.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé.' },
        { status: 409 } // 409 = Conflict (email déjà existant)
      );
    }

    // ✅ Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Créer l'étudiant
    const newEtudiant = await prisma.etudiant.create({
      data: {
        nom,
        prenom,
        email,
        password: hashedPassword,
        etablissement,
        niveau,
      },
    });

    return NextResponse.json(newEtudiant, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);

    return NextResponse.json(
      { error: "Erreur interne lors de l'inscription." },
      { status: 500 }
    );
  }
}

// ➤ Récupérer tous les étudiants (GET)
export async function GET() {
  try {
    const etudiants = await prisma.etudiant.findMany();

    return NextResponse.json(etudiants, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des étudiants :', error);

    return NextResponse.json(
      { error: 'Erreur lors de la récupération des étudiants.' },
      { status: 500 }
    );
  }
}
