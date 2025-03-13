import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler pour GET /api/stages
export async function GET() {
  try {
    const stages = await prisma.stage.findMany();
    return new Response(JSON.stringify(stages), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des stages' }), { status: 500 });
  }
}

// Handler pour POST /api/stages
export async function POST(request: Request) {
  try {
    const { intitulé, date } = await request.json();

    if (!intitulé || !date) {
      return new Response(JSON.stringify({ error: 'L\'intitulé et la date sont obligatoires' }), { status: 400 });
    }

    const newStage = await prisma.stage.create({
      data: {
        intitulé,
        date: new Date(date),
      },
    });

    return new Response(JSON.stringify(newStage), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la création du stage' }), { status: 500 });
  }
}
