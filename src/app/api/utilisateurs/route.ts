import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { nom, prenom, email, password, etablissement, niveau, role, avatar } = await request.json()

    // Créer l'utilisateur dans la base de données
    const utilisateur = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        password,  // Assure-toi de hacher le mot de passe avant de l'enregistrer
        etablissement,
        niveau,
        role
      }
    })

    return new Response(JSON.stringify(utilisateur), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Failed to create utilisateur' }), { status: 500 })
  }
}
