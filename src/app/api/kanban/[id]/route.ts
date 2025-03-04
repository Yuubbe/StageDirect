import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const kanban = await prisma.kanban.findUnique({
      where: { userId: parseInt(params.id) },
      include: { etudiant: true }
    });
    return NextResponse.json(kanban || { columns: [] });
  } catch (error) {
    console.error('Erreur lors de la récupération du tableau Kanban :', error);
    return NextResponse.json({ success: false, message: 'Erreur lors du chargement des données.' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id);
    const user = await prisma.etudiant.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Utilisateur non connecté ou inexistant.' }, { status: 403 });
    }

    const { columns } = await request.json();
    await prisma.kanban.upsert({
      where: { userId },
      update: { columns },
      create: { userId, columns },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du tableau Kanban :", error);
    return NextResponse.json({ success: false, message: "Erreur lors de l'enregistrement du tableau." }, { status: 500 });
  }
}