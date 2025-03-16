// pages/stages/page.tsx
"use client"
import { useState, useEffect } from 'react';

interface Entreprise {
  id_entreprise: number;
  nom_entreprise: string;
}

interface Contact {
  id_contact: number;
  nom_contact: string;
}

interface ApiError {
  message: string;
  error?: string;
}

const StagePage = () => {
  const [newIntitulé, setNewIntitulé] = useState('');
  const [newDate, setNewDate] = useState('');
  const [selectedEntreprise, setSelectedEntreprise] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [entreprises, setEntreprises] = useState<Entreprise[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger les entreprises et contacts au chargement de la page
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('/api/stages', {
          method: 'OPTIONS',
        });
        if (!response.ok) throw new Error('Erreur lors du chargement des données');
        
        const data = await response.json();
        setEntreprises(data.entreprises);
        setContacts(data.contacts);
        setLoading(false);
      } catch (_) {
        setError('Erreur lors du chargement des entreprises et contacts');
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  // Gérer la soumission du formulaire pour ajouter un nouveau stage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newIntitulé || !newDate || !selectedEntreprise || !selectedContact) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    try {
      const response = await fetch('/api/stages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intitulé: newIntitulé,
          date: newDate,
          entrepriseId: parseInt(selectedEntreprise),
          contactId: parseInt(selectedContact),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json() as ApiError;
        throw new Error(errorData.error || 'Erreur lors de l\'ajout du stage');
      }

      setError(null);
      setNewIntitulé('');
      setNewDate('');
      setSelectedEntreprise('');
      setSelectedContact('');
      alert('Stage ajouté avec succès!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur est survenue');
      }
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter un Stage</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="intitulé" className="block font-medium">
            Intitulé
          </label>
          <input
            type="text"
            id="intitulé"
            value={newIntitulé}
            onChange={(e) => setNewIntitulé(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="entreprise" className="block font-medium">
            Entreprise
          </label>
          <select
            id="entreprise"
            value={selectedEntreprise}
            onChange={(e) => setSelectedEntreprise(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Sélectionnez une entreprise</option>
            {entreprises.map((entreprise) => (
              <option key={entreprise.id_entreprise} value={entreprise.id_entreprise}>
                {entreprise.nom_entreprise}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact" className="block font-medium">
            Contact
          </label>
          <select
            id="contact"
            value={selectedContact}
            onChange={(e) => setSelectedContact(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Sélectionnez un contact</option>
            {contacts.map((contact) => (
              <option key={contact.id_contact} value={contact.id_contact}>
                {contact.nom_contact}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Ajouter le Stage
        </button>
      </form>
    </div>
  );
};

export default StagePage;
