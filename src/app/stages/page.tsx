// pages/stages/page.tsx
"use client"
import { useEffect, useState } from 'react'

type Stage = {
  id: number
  titre: string
  description: string
  dateDebut: string
  dateFin: string
  entreprise: string
  utilisateur: string
}

export default function StagesPage() {
  const [stages, setStages] = useState<Stage[]>([])

  // Récupérer les stages depuis l'API
  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await fetch('/api/stages')
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des stages')
        }
        const data = await response.json()
        setStages(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchStages()
  }, [])

  return (
    <div>
      <h1>Liste des Stages</h1>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Entreprise</th>
            <th>Utilisateur</th>
          </tr>
        </thead>
        <tbody>
          {stages.map((stage) => (
            <tr key={stage.id}>
              <td>{stage.titre}</td>
              <td>{stage.description}</td>
              <td>{new Date(stage.dateDebut).toLocaleDateString()}</td>
              <td>{new Date(stage.dateFin).toLocaleDateString()}</td>
              <td>{stage.entreprise}</td>
              <td>{stage.utilisateur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
