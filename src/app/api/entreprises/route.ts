import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Récupérer toutes les entreprises
export const getEntreprises = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const entreprises = await prisma.entreprise.findMany({
      include: {
        secteur_activite: true,
        contact: true
      }
    });
    res.status(200).json(entreprises);
  } catch (error) {
    console.error('Erreur lors de la récupération des entreprises:', error);
    res.status(500).json({ message: "Erreur lors de la récupération des entreprises", error: error.message });
  }
};

// Récupérer une entreprise par son ID
export const getEntrepriseById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const entrepriseId = Number(id);  // Assurez-vous que l'ID est correctement converti en nombre

  if (isNaN(entrepriseId)) {
    return res.status(400).json({ message: "L'ID de l'entreprise n'est pas valide" });
  }

  try {
    const entreprise = await prisma.entreprise.findUnique({
      where: {
        id: entrepriseId
      },
      include: {
        secteur_activite: true,
        contact: true
      }
    });

    if (entreprise) {
      res.status(200).json(entreprise);
    } else {
      res.status(404).json({ message: "Entreprise non trouvée" });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'entreprise:', error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'entreprise", error: error.message });
  }
};

// Créer une nouvelle entreprise
export const createEntreprise = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    nom_entreprise,
    rue_entreprise,
    cp_entreprise,
    ville_entreprise,
    pays_entreprise,
    service_entreprise,
    tel_entreprise,
    fax_entreprise,
    email_entreprise,
    taille_entreprise,
    fk_id_activite,
    fk_id_contact,
    valider
  } = req.body;

  // Vérification basique des données d'entrée
  if (!nom_entreprise || !rue_entreprise || !cp_entreprise || !ville_entreprise || !email_entreprise) {
    return res.status(400).json({ message: "Certains champs obligatoires sont manquants" });
  }

  try {
    const newEntreprise = await prisma.entreprise.create({
      data: {
        nom_entreprise,
        rue_entreprise,
        cp_entreprise,
        ville_entreprise,
        pays_entreprise,
        service_entreprise,
        tel_entreprise,
        fax_entreprise,
        email_entreprise,
        taille_entreprise,
        fk_id_activite,
        fk_id_contact,
        valider
      }
    });
    res.status(201).json(newEntreprise);
  } catch (error) {
    console.error('Erreur lors de la création de l\'entreprise:', error);
    res.status(500).json({ message: "Erreur lors de la création de l'entreprise", error: error.message });
  }
};

// Mettre à jour une entreprise existante
export const updateEntreprise = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const entrepriseId = Number(id);

  if (isNaN(entrepriseId)) {
    return res.status(400).json({ message: "L'ID de l'entreprise n'est pas valide" });
  }

  const {
    nom_entreprise,
    rue_entreprise,
    cp_entreprise,
    ville_entreprise,
    pays_entreprise,
    service_entreprise,
    tel_entreprise,
    fax_entreprise,
    email_entreprise,
    taille_entreprise,
    fk_id_activite,
    fk_id_contact,
    valider
  } = req.body;

  // Vérification basique des données d'entrée
  if (!nom_entreprise || !rue_entreprise || !cp_entreprise || !ville_entreprise || !email_entreprise) {
    return res.status(400).json({ message: "Certains champs obligatoires sont manquants" });
  }

  try {
    const updatedEntreprise = await prisma.entreprise.update({
      where: {
        id: entrepriseId
      },
      data: {
        nom_entreprise,
        rue_entreprise,
        cp_entreprise,
        ville_entreprise,
        pays_entreprise,
        service_entreprise,
        tel_entreprise,
        fax_entreprise,
        email_entreprise,
        taille_entreprise,
        fk_id_activite,
        fk_id_contact,
        valider
      }
    });
    res.status(200).json(updatedEntreprise);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Erreur inconnue';
    console.error('Erreur lors de la mise à jour de l\'entreprise:', errorMessage);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'entreprise", error: errorMessage });
  }
};

// Supprimer une entreprise
export const deleteEntreprise = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const entrepriseId = Number(id);

  if (isNaN(entrepriseId)) {
    return res.status(400).json({ message: "L'ID de l'entreprise n'est pas valide" });
  }

  try {
    const deletedEntreprise = await prisma.entreprise.delete({
      where: {
        id: entrepriseId
      }
    });
    res.status(200).json(deletedEntreprise);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Erreur inconnue';
    console.error('Erreur lors de la suppression de l\'entreprise:', errorMessage);
    res.status(500).json({ message: "Erreur lors de la suppression de l'entreprise", error: errorMessage });
  }
};

// Fonction principale qui gère les différentes méthodes HTTP
const handleEntreprise = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        return getEntrepriseById(req, res);
      } else {
        return getEntreprises(req, res);
      }
    case 'POST':
      return createEntreprise(req, res);
    case 'PUT':
      return updateEntreprise(req, res);
    case 'DELETE':
      return deleteEntreprise(req, res);
    default:
      res.status(405).json({ message: 'Méthode non autorisée' });
  }
};

export default handleEntreprise;
