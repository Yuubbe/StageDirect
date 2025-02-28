import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔹 Récupérer tous les utilisateurs (GET)
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Erreur de récupération des utilisateurs" }, { status: 500 });
  }
}

// 🔹 Ajouter un utilisateur (POST)
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    const newUser = await prisma.user.create({ data: { name, email } });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'ajout" }, { status: 500 });
  }
}
