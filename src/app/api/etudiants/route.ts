import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const etudiants = await prisma.etudiant.findMany();
    return NextResponse.json(etudiants);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des étudiants' }, { status: 500 });
  }
}
