import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer tous les utilisateurs avec leurs rôles
    const users = await prisma.etudiant.findMany({
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        role: true, // Assurez-vous que le champ role est bien inclus
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return NextResponse.json({ error: "Erreur de récupération des utilisateurs" }, { status: 500 });
  }
}

// 🔹 Ajouter un utilisateur (POST)
export async function POST(req: Request) {
  try {
    const { nom, prenom, email, role, password } = await req.json();

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
        password: hashedPassword, // Ajouter le mot de passe haché
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un utilisateur :", error);
    return NextResponse.json({ error: "Erreur lors de l'ajout de l'utilisateur" }, { status: 500 });
  }
}

// 🔹 Connexion d'un utilisateur (POST)
export async function POST_LOGIN(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.etudiant.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
    }

    // Inclure le rôle de l'utilisateur dans le JWT
    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

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
