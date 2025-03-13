import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Récupérer tous les secteurs
const getSecteurs = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const secteurs = await prisma.secteurActivite.findMany();
    res.status(200).json(secteurs);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des secteurs", error });
  }
};

// Créer un secteur
const createSecteur = async (req: NextApiRequest, res: NextApiResponse) => {
  const { libelle_activite } = req.body;
  
  try {
    const newSecteur = await prisma.secteurActivite.create({
      data: { libelle_activite }
    });
    res.status(201).json(newSecteur);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du secteur", error });
  }
};

// Fonction principale pour gérer les méthodes HTTP
const handleSecteur = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getSecteurs(req, res);
    case "POST":
      return createSecteur(req, res);
    default:
      res.status(405).json({ message: "Méthode non autorisée" });
  }
};

export default handleSecteur;
