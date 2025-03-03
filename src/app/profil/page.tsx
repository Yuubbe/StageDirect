"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AfficherEtudiants = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const response = await fetch('/api/etudiants');
        if (response.ok) {
          const data = await response.json();
          setEtudiants(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des étudiants', error);
      }
    };
    if (isLoggedIn) {
      fetchEtudiants();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {etudiants.map((etudiant) => (
        <Card key={etudiant.id}>
          <CardContent>
            <h2 className="text-xl font-bold">{etudiant.nom} {etudiant.prenom}</h2>
            <p>Email: {etudiant.email}</p>
            <p>Etablissement: {etudiant.etablissement}</p>
            <p>Niveau : {etudiant.niveau}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AfficherEtudiants;
