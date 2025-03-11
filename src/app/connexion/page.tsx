"use client"  // Ajoute cette ligne en haut du fichier

import { useState } from "react"

const PageConnexion = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null) // État pour l'email de l'utilisateur

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage("Connexion réussie !")
        setUserEmail(data.email) // Stocker l'email de l'utilisateur en cas de succès
      } else {
        setMessage(data.message || "Identifiants incorrects.")
        setUserEmail(null) // Réinitialiser l'email en cas d'échec
      }
    } catch (error) {
      console.error(error)
      setMessage("Une erreur est survenue.")
      setUserEmail(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Chargement..." : "Se connecter"}
        </button>
      </form>

      {message && <div>{message}</div>}

      {/* Afficher l'email de l'utilisateur si connecté */}
      {userEmail && <div>Vous êtes connecté en tant que : {userEmail}</div>}
    </div>
  )
}

export default PageConnexion
