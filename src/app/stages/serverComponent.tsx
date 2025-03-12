// app/stages/serverComponent.tsx
import prisma from '../../lib/prisma';

export const getEntreprises = async () => {
  const entreprises = await prisma.entreprise.findMany();
  return entreprises;
};
