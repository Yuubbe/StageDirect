import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// 🔹 Récupérer tous les utilisateurs (GET)
export async function GET() {
  try {
    const users = await prisma.utilisateur.findMany({
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        role: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return NextResponse.json(
      { error: "Erreur de récupération des utilisateurs" },
      { status: 500 }
    );
  }
}

// 🔹 Ajouter un utilisateur (POST)
export async function POST(req: Request) {
  try {
    if (!req.body) {
      return NextResponse.json({ error: "Aucune donnée reçue" }, { status: 400 });
    }

    const { nom, prenom, email, role, password, etablissement, niveau } = await req.json();

    if (!nom || !prenom || !email || !role || !password || !etablissement || !niveau) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.utilisateur.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });
    }

    // Hacher le mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajouter un nouvel utilisateur avec un rôle
    const newUser = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        role,
        password: hashedPassword,
        etablissement,
        niveau,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un utilisateur :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout de l'utilisateur" },
      { status: 500 }
    );
  }
}

// 🔹 Connexion d'un utilisateur (POST)
export async function login(req: Request) {
  try {
    if (!req.body) {
      return NextResponse.json({ error: "Aucune donnée reçue" }, { status: 400 });
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
    }

    const user = await prisma.utilisateur.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
    }

    // Générer le token JWT
    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Créer la réponse avec le cookie
    const response = NextResponse.json({ message: "Connexion réussie" }, { status: 200 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 heure
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
