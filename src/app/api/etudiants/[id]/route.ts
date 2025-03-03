import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function PUT(request: Request, context: { params: { id: string } }) {
  const id = Number.parseInt(context.params.id);
  const body = await request.json();

  try {
    const updatedData: any = { email: body.email };

    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedEtudiant = await prisma.etudiant.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json(updatedEtudiant);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'étudiant :", error);
    return NextResponse.json({ error: "Échec de la mise à jour de l'étudiant" }, { status: 500 });
  }
}
