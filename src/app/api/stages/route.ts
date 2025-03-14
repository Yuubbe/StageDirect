import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler pour GET /api/stages
export async function GET() {
  try {
    const stages = await prisma.stage.findMany({
      include: {
        entreprise: true,
        contact: true,
      }
    });
    return new Response(JSON.stringify(stages), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des stages' }), { status: 500 });
  }
}

// Handler pour POST /api/stages
export async function POST(request: Request) {
  try {
    const { intitulé, date, entrepriseId, contactId } = await request.json();

    if (!intitulé || !date || !entrepriseId || !contactId) {
      return new Response(
        JSON.stringify({ 
          error: 'L\'intitulé, la date, l\'entreprise et le contact sont obligatoires' 
        }), 
        { status: 400 }
      );
    }

    // Vérifier si l'entreprise existe
    const entreprise = await prisma.entreprise.findUnique({
      where: { id_entreprise: entrepriseId }
    });

    if (!entreprise) {
      return new Response(
        JSON.stringify({ error: 'Entreprise non trouvée' }), 
        { status: 404 }
      );
    }

    // Vérifier si le contact existe
    const contact = await prisma.contact.findUnique({
      where: { id_contact: contactId }
    });

    if (!contact) {
      return new Response(
        JSON.stringify({ error: 'Contact non trouvé' }), 
        { status: 404 }
      );
    }

    const newStage = await prisma.stage.create({
      data: {
        intitulé,
        date: new Date(date),
        entrepriseId,
        contactId,
      },
      include: {
        entreprise: true,
        contact: true,
      }
    });

    return new Response(JSON.stringify(newStage), { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du stage:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la création du stage' }), { status: 500 });
  }
}

// Endpoint pour récupérer la liste des entreprises
export async function OPTIONS() {
  try {
    const [entreprises, contacts] = await Promise.all([
      prisma.entreprise.findMany({
        select: {
          id_entreprise: true,
          nom_entreprise: true,
        }
      }),
      prisma.contact.findMany({
        select: {
          id_contact: true,
          nom_contact: true,
        }
      })
    ]);

    return new Response(
      JSON.stringify({ entreprises, contacts }), 
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération des options' }), 
      { status: 500 }
    );
  }
}
