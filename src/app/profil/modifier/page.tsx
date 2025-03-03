"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Etudiant {
  id: number
  nom: string
  prenom: string
  email: string
  etablissement: string
  niveau: string
}

const ModifierEtudiants = () => {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      setIsLoggedIn(true)
    } else {
      router.push("/login")
    }
  }, [router])

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const response = await fetch("/api/etudiants")
        if (response.ok) {
          const data = await response.json()
          setEtudiants(data)
        } else {
          alert("Erreur : Impossible de récupérer les données des étudiants.")
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants", error)
        alert("Erreur : Une erreur est survenue lors de la récupération des données.")
      }
    }
    if (isLoggedIn) {
      fetchEtudiants()
    }
  }, [isLoggedIn])

  const handleInputChange = (id: number, field: keyof Etudiant, value: string) => {
    setEtudiants(etudiants.map((etudiant) => (etudiant.id === id ? { ...etudiant, [field]: value } : etudiant)))
  }

  const handleSubmit = async (id: number) => {
    const etudiant = etudiants.find((e) => e.id === id)
    if (!etudiant) return

    try {
      const response = await fetch(`/api/etudiants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(etudiant),
      })

      if (response.ok) {
        alert("Succès : Les informations de l'étudiant ont été mises à jour.")
      } else {
        alert("Erreur : Impossible de mettre à jour les informations de l'étudiant.")
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'étudiant", error)
      alert("Erreur : Une erreur est survenue lors de la mise à jour des informations.")
    }
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Modifier les informations des étudiants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {etudiants.map((etudiant) => (
          <Card key={etudiant.id}>
            <CardHeader>
              <CardTitle>
                {etudiant.nom} {etudiant.prenom}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit(etudiant.id)
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor={`nom-${etudiant.id}`}>Nom</Label>
                  <Input
                    id={`nom-${etudiant.id}`}
                    value={etudiant.nom}
                    onChange={(e) => handleInputChange(etudiant.id, "nom", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`prenom-${etudiant.id}`}>Prénom</Label>
                  <Input
                    id={`prenom-${etudiant.id}`}
                    value={etudiant.prenom}
                    onChange={(e) => handleInputChange(etudiant.id, "prenom", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`email-${etudiant.id}`}>Email</Label>
                  <Input
                    id={`email-${etudiant.id}`}
                    type="email"
                    value={etudiant.email}
                    onChange={(e) => handleInputChange(etudiant.id, "email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`etablissement-${etudiant.id}`}>Établissement</Label>
                  <Input
                    id={`etablissement-${etudiant.id}`}
                    value={etudiant.etablissement}
                    onChange={(e) => handleInputChange(etudiant.id, "etablissement", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`niveau-${etudiant.id}`}>Niveau</Label>
                  <Select
                    value={etudiant.niveau}
                    onValueChange={(value) => handleInputChange(etudiant.id, "niveau", value)}
                  >
                    <SelectTrigger id={`niveau-${etudiant.id}`}>
                      <SelectValue placeholder="Sélectionnez un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L1">L1</SelectItem>
                      <SelectItem value="L2">L2</SelectItem>
                      <SelectItem value="L3">L3</SelectItem>
                      <SelectItem value="M1">M1</SelectItem>
                      <SelectItem value="M2">M2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Enregistrer les modifications
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ModifierEtudiants
