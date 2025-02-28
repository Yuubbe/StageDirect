"use client";

import { useState, useEffect } from "react";

export default function TestDBPage() {
  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Charger les utilisateurs
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => setError("Erreur de chargement des utilisateurs"));
  }, []);

  // Ajouter un utilisateur
  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (!res.ok) {
      setError("Erreur lors de l'ajout de l'utilisateur");
      return;
    }
    const newUser = await res.json();
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>✅ Connexion MySQL réussie avec Prisma !</h1>

      {/* Formulaire d'ajout */}
      <form onSubmit={addUser} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Ajouter</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Liste des utilisateurs */}
      <h2>Liste des utilisateurs :</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))
        ) : (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </ul>
    </div>
  );
}
