// pages/stages/page.tsx
"use client"
import { useState } from 'react';

const StagePage = () => {
  const [newIntitulé, setNewIntitulé] = useState('');
  const [newDate, setNewDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Gérer la soumission du formulaire pour ajouter un nouveau stage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newIntitulé || !newDate) {
      setError("L'intitulé et la date sont obligatoires");
      return;
    }

    try {
      const response = await fetch('/api/stages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ intitulé: newIntitulé, date: newDate }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du stage');
      }

      setError(null); // Reset error if successful
      setNewIntitulé('');
      setNewDate('');
      alert('Stage ajouté avec succès!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Ajouter un Stage</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="intitulé">Intitulé</label>
          <input
            type="text"
            id="intitulé"
            value={newIntitulé}
            onChange={(e) => setNewIntitulé(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter le Stage</button>
      </form>
    </div>
  );
};

export default StagePage;
