"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, ArrowLeft } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"

// Simuler une liste d'entreprises provenant de la base de données
const entreprises = [
  { id: 1, nom: "TechInnovate" },
  { id: 2, nom: "EcoSolutions" },
  { id: 3, nom: "MediaFuture" },
  { id: 4, nom: "HealthTech" },
  { id: 5, nom: "FinancePlus" },
]

export default function EnregistrementStage() {
  const [selectedEntreprise, setSelectedEntreprise] = useState("")

  return (
    <div className="container mx-auto py-10">
      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'accueil
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            >
              <Briefcase className="h-12 w-12 text-primary mb-4" />
            </motion.div>
            <CardTitle>Enregistrement d'un nouveau stage</CardTitle>
            <CardDescription>
              Remplissez les détails du stage. Il devra être validé par un professeur avant d'être publié.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Label htmlFor="entreprise">Entreprise</Label>
                <Select onValueChange={setSelectedEntreprise} value={selectedEntreprise}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une entreprise" />
                  </SelectTrigger>
                  <SelectContent>
                    {entreprises.map((entreprise) => (
                      <SelectItem key={entreprise.id} value={entreprise.id.toString()}>
                        {entreprise.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Label htmlFor="titre">Titre du stage</Label>
                <Input id="titre" placeholder="Ex: Développeur Full-Stack Junior" />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Label htmlFor="description">Description du stage</Label>
                <Textarea id="description" placeholder="Décrivez les responsabilités et les tâches du stagiaire" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <Label htmlFor="date-debut">Date de début</Label>
                  <DatePicker />
                </div>
                <div>
                  <Label htmlFor="date-fin">Date de fin</Label>
                  <DatePicker />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                <Label htmlFor="duree">Durée (en semaines)</Label>
                <Input id="duree" type="number" min="1" placeholder="Ex: 12" />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                <Label htmlFor="remuneration">Rémunération (€ par mois)</Label>
                <Input id="remuneration" type="number" min="0" placeholder="Ex: 800" />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                <Label htmlFor="competences">Compétences requises</Label>
                <Input id="competences" placeholder="Ex: React, Node.js, SQL" />
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Annuler</Button>
            <Button>Soumettre pour validation</Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        className="mt-8 text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Ce stage devra être validé par un professeur avant d'être publié.</p>
      </motion.div>
    </div>
  )
}

