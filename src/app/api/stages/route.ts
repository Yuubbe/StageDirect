// api/stages/route.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Récupérer tous les stages
      try {
        const stages = await prisma.stage.findMany()
        res.status(200).json(stages)
      } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des stages' })
      }
      break

    case 'POST':
      // Ajouter un nouveau stage
      try {
        const { titre, description, dateDebut, dateFin, entreprise, utilisateur } = req.body
        const newStage = await prisma.stage.create({
          data: {
            titre,
            description,
            dateDebut,
            dateFin,
            entreprise,
            utilisateur,
          },
        })
        res.status(201).json(newStage)
      } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du stage' })
      }
      break

    default:
      res.status(405).json({ error: 'Méthode non autorisée' })
      break
  }
}
