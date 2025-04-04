"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Stage {
  id: number
  intitulé: string
  date: string
  entreprise: {
    nom_entreprise: string
  }
  contact: {
    nom_contact: string
  }
}

export default function StageList() {
  const [stages, setStages] = useState<Stage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStages()
  }, [])

  const fetchStages = async () => {
    try {
      const response = await fetch("/api/stages")
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des stages")
      }
      const data = await response.json()
      setStages(data)
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredStages = stages.filter((stage) =>
    stage.intitulé.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stage.entreprise.nom_entreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stage.contact.nom_contact.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Liste des Stages</h1>
        <Link href="/stages/ajouter">
          <Button>Ajouter un stage</Button>
        </Link>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Rechercher un stage..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStages.map((stage) => (
          <Card key={stage.id}>
            <CardHeader>
              <CardTitle>{stage.intitulé}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Entreprise: {stage.entreprise.nom_entreprise}
              </p>
              <p className="text-sm text-gray-600">
                Contact: {stage.contact.nom_contact}
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date(stage.date).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-end">
                <Link href={`/stages/modifier/${stage.id}`}>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}