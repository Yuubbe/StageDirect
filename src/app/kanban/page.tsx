"use client";
import KanbanBoard from "@/components/kanban-board";
import { useState } from "react";

export default function Home() {
  const [columns, setColumns] = useState([]);

  const saveBoard = () => {
    const userId = 1; // Remplace avec l'ID utilisateur dynamique si nécessaire
    fetch(`/api/kanban/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ columns })
    })
      .then((res) => {
        console.log('Statut de la réponse :', res.status);
        if (!res.ok) {
          return res.text().then((text) => {
            console.error('Erreur côté serveur :', text);
            throw new Error(`Erreur lors de l'enregistrement du tableau : ${text}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log('Réponse JSON :', data);
        if (data?.success) {
          alert('Tableau enregistré avec succès !');
        }
      })
      .catch((error) => {
        console.error('Erreur :', error);
        alert(`Une erreur est survenue lors de l'enregistrement : ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 p-4 md:p-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <line x1="3" x2="21" y1="9" y2="9" />
                <line x1="9" x2="9" y1="21" y2="9" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mon Tableau Trello
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={saveBoard}
              className="rounded-full bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-sm font-medium text-white hover:from-green-600 hover:to-green-700 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </header>
      <main>
        <KanbanBoard columns={columns} setColumns={setColumns} />
      </main>
    </div>
  );
}
