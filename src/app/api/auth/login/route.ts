import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email et mot de passe requis' }), { status: 400 })
    }

    // Vérifier si l'utilisateur existe
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { email },
    })

    if (!utilisateur) {
      return new Response(JSON.stringify({ message: 'Utilisateur non trouvé' }), { status: 404 })
    }

    // Comparer les mots de passe en texte clair (pour les tests uniquement)
    if (utilisateur.password !== password) {
      return new Response(JSON.stringify({ message: 'Mot de passe incorrect' }), { status: 400 })
    }

    return new Response(JSON.stringify({
      id: utilisateur.id,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      email: utilisateur.email,
      etablissement: utilisateur.etablissement,
      niveau: utilisateur.niveau,
      role: utilisateur.role,
      avatar: utilisateur.avatar,
    }), { status: 200 })

  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Erreur interne' }), { status: 500 })
  }
}
