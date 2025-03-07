"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users", { method: "GET" });
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des utilisateurs");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Page Admin</h1>
      <p>Bienvenue sur la page d'administration. Voici la liste des utilisateurs :</p>
      {error && <p className="text-red-500">{error}</p>}
      <table className="mt-4 w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prénom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.nom}</td>
              <td className="border p-2">{user.prenom}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
