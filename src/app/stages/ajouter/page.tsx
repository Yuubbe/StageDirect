"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Entreprise {
  id_entreprise: number
  nom_entreprise: string
}

interface Contact {
  id_contact: number
  nom_contact: string
}

interface ApiError {
  message: string
  error?: string
}

const StagePage = () => {
  const [newIntitulé, setNewIntitulé] = useState("")
  const [newDate, setNewDate] = useState("")
  const [selectedEntreprise, setSelectedEntreprise] = useState("")
  const [selectedContact, setSelectedContact] = useState("")
  const [entreprises, setEntreprises] = useState<Entreprise[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Charger les entreprises et contacts au chargement de la page
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("/api/stages", {
          method: "OPTIONS",
        })
        if (!response.ok) throw new Error("Erreur lors du chargement des données")

        const data = await response.json()
        setEntreprises(data.entreprises)
        setContacts(data.contacts)
        setLoading(false)
      } catch (_) {
        setError("Erreur lors du chargement des entreprises et contacts")
        setLoading(false)
      }
    }

    fetchOptions()
  }, [])

  // Gérer la soumission du formulaire pour ajouter un nouveau stage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    if (!newIntitulé || !newDate || !selectedEntreprise || !selectedContact) {
      setError("Tous les champs sont obligatoires")
      setSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/stages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intitulé: newIntitulé,
          date: newDate,
          entrepriseId: Number.parseInt(selectedEntreprise),
          contactId: Number.parseInt(selectedContact),
        }),
      })

      if (!response.ok) {
        const errorData = (await response.json()) as ApiError
        throw new Error(errorData.error || "Erreur lors de l'ajout du stage")
      }

      setError(null)
      setSuccess(true)

      // Reset form after showing success message
      setTimeout(() => {
        setNewIntitulé("")
        setNewDate("")
        setSelectedEntreprise("")
        setSelectedContact("")
        setSuccess(false)
      }, 2000)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Une erreur est survenue")
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="text-lg font-medium text-muted-foreground">Chargement des données...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-2xl font-bold">Ajouter un Stage</CardTitle>
            <CardDescription>Remplissez le formulaire pour ajouter un nouveau stage</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription>Stage ajouté avec succès!</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="intitulé" className="text-sm font-medium">
                  Intitulé
                </Label>
                <Input
                  type="text"
                  id="intitulé"
                  value={newIntitulé}
                  onChange={(e) => setNewIntitulé(e.target.value)}
                  className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="Titre du stage"
                  required
                  disabled={submitting}
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="date" className="text-sm font-medium">
                  Date
                </Label>
                <Input
                  type="date"
                  id="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required
                  disabled={submitting}
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="entreprise" className="text-sm font-medium">
                  Entreprise
                </Label>
                <Select value={selectedEntreprise} onValueChange={setSelectedEntreprise} disabled={submitting}>
                  <SelectTrigger className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Sélectionnez une entreprise" />
                  </SelectTrigger>
                  <SelectContent>
                    {entreprises.map((entreprise) => (
                      <SelectItem key={entreprise.id_entreprise} value={entreprise.id_entreprise.toString()}>
                        {entreprise.nom_entreprise}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="contact" className="text-sm font-medium">
                  Contact
                </Label>
                <Select value={selectedContact} onValueChange={setSelectedContact} disabled={submitting}>
                  <SelectTrigger className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Sélectionnez un contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id_contact} value={contact.id_contact.toString()}>
                        {contact.nom_contact}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="bg-muted/30 flex justify-end pt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full"
            >
              <Button
                type="submit"
                className="w-full relative overflow-hidden group"
                size="lg"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    Ajouter le Stage
                    <span className="absolute right-full w-full h-full bg-white/20 transform skew-x-12 transition-transform duration-700 group-hover:translate-x-[200%]" />
                  </>
                )}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default StagePage
