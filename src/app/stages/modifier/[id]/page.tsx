"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface Stage {
  id: number
  intitulé: string
  date: string
  entreprise: {
    id_entreprise: number
    nom_entreprise: string
  }
  contact: {
    id_contact: number
    nom_contact: string
  }
}

export default function ModifierStage() {
  const params = useParams()
  const router = useRouter()
  const [stage, setStage] = useState<Stage | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    intitulé: "",
    date: "",
    entreprise: {
      id: 0
    },
    contact: {
      id: 0
    }
  })

  useEffect(() => {
    fetchStage()
  }, [params.id])

  const fetchStage = async () => {
    try {
      const response = await fetch(`/api/stages/${params.id}`)
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du stage")
      }
      const data = await response.json()
      setStage(data)
      setFormData({
        intitulé: data.intitulé,
        date: new Date(data.date).toISOString().split('T')[0],
        entreprise: {
          id: data.entreprise.id_entreprise
        },
        contact: {
          id: data.contact.id_contact
        }
      })
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de la récupération du stage")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/stages/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du stage")
      }

      toast.success("Stage modifié avec succès")
      router.push("/stages")
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de la modification du stage")
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>
  }

  if (!stage) {
    return <div className="flex justify-center items-center min-h-screen">Stage non trouvé</div>
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Modifier le Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="intitulé">Intitulé du stage</Label>
              <Input
                id="intitulé"
                value={formData.intitulé}
                onChange={(e) => setFormData({ ...formData, intitulé: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Entreprise</Label>
              <Input
                value={stage.entreprise.nom_entreprise}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label>Contact</Label>
              <Input
                value={stage.contact.nom_contact}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/stages")}
              >
                Annuler
              </Button>
              <Button type="submit">Enregistrer les modifications</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

