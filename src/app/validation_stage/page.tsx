'use client'
import React, { useEffect, useState } from 'react';

interface Stage {
  id: number;
  intitulé: string;
  date: Date;
  valider: boolean;
}

const ValidationStagePage = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await fetch('/api/valider_stages');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des stages');
        }
        const data = await response.json();
        setStages(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Une erreur inconnue est survenue.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, []);

  const handleValidation = async (id_stage: number) => {
    try {
      const response = await fetch('/api/valider_stages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_stage, action: 'valider' }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la validation du stage');
      }
      // Refresh the stages after validation
      const updatedStages = stages.map(stage =>
        stage.id === id_stage ? { ...stage, valider: true } : stage
      );
      setStages(updatedStages);
      setMessage('Stage validé avec succès!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur inconnue est survenue.');
      }
    }
  };

  const handleRejection = async (id_stage: number) => {
    try {
      const response = await fetch('/api/valider_stages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_stage, action: 'refuser' }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors du refus du stage');
      }
      // Refresh the stages after rejection
      const updatedStages = stages.map(stage =>
        stage.id === id_stage ? { ...stage, valider: false } : stage
      );
      setStages(updatedStages);
      setMessage('Stage refusé avec succès!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur inconnue est survenue.');
      }
    }
  };

  if (loading) return <div>Chargement des stages...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Validation des Stages</h1>
      {message && <div>{message}</div>}
      <ul>
        {stages.map(stage => (
          <li key={stage.id}>
            <span>{stage.intitulé} - {stage.date.toString()}</span>
            <button onClick={() => handleValidation(stage.id)}>Valider</button>
            <button onClick={() => handleRejection(stage.id)}>Refuser</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValidationStagePage;
