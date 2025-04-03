"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, Building2, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

interface Entreprise {
  id_entreprise: number
  nom_entreprise: string
  rue_entreprise: string
  ville_entreprise: string
  valider: boolean
}

export default function EntreprisesValidation() {
  const [entreprises, setEntreprises] = useState<Entreprise[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState<number | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const router = useRouter()

  // Vérification du rôle de l'utilisateur avant de charger la page
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (!res.ok) throw new Error("Erreur d'authentification")

        const data = await res.json()
        if (!data.role || (data.role !== "PROFESSEUR" && data.role !== "ADMIN" && data.role !== "SUPERADMIN")) {
          toast.error("Accès non autorisé")
          router.push("/")  // Rediriger vers la page d'accueil si l'utilisateur n'a pas accès
          return
        }

        // Si l'accès est autorisé, récupérer les entreprises
        const fetchEntreprises = async () => {
          try {
            const res = await fetch("/api/valider_entreprises")
            if (!res.ok) throw new Error(`Erreur ${res.status} lors de la récupération.`)
            const data = await res.json()
            setEntreprises(data.filter((entreprise: Entreprise) => entreprise.valider === false))
          } catch (error) {
            console.error("Erreur lors de la récupération des entreprises :", error)
            setError("Impossible de récupérer les entreprises.")
          } finally {
            setLoading(false)
          }
        }

        fetchEntreprises()
      } catch (error) {
        toast.error("Erreur lors de la vérification des droits")
        router.push("/")
      }
    }

    checkAccess()
  }, [router])

  // Fonction pour valider ou refuser une entreprise
  const handleValidation = async (id: number, action: "valider" | "refuser") => {
    setProcessing(id)
    try {
      const res = await fetch(`/api/valider_entreprises`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_entreprise: id,
          action: action,
        }),
      })

      if (!res.ok) throw new Error(`Erreur ${res.status} lors de la mise à jour.`)

      await res.json()

      // Mettre à jour l'affichage après validation/refus
      setEntreprises((prevEntreprises) => prevEntreprises.filter((entreprise) => entreprise.id_entreprise !== id))

      // Afficher une notification
      setNotification({
        message: action === "valider" ? "Entreprise validée avec succès" : "Entreprise refusée avec succès",
        type: "success",
      })

      // Masquer la notification après 3 secondes
      setTimeout(() => setNotification(null), 3000)
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'entreprise :", error)
      setNotification({
        message: "Impossible de mettre à jour l'entreprise",
        type: "error",
      })
      setTimeout(() => setNotification(null), 3000)
    } finally {
      setProcessing(null)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <Card className="w-full shadow-xl border-t-4 border-primary">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-bold">Validation des entreprises</CardTitle>
            </div>
            <CardDescription>Approuvez ou refusez les demandes d'inscription des entreprises</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="h-10 w-20" />
                      <Skeleton className="h-10 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2"
              >
                <XCircle className="h-5 w-5" />
                <p>{error}</p>
              </motion.div>
            ) : entreprises.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium">Aucune entreprise en attente de validation</p>
                <p className="text-muted-foreground mt-2">Toutes les demandes ont été traitées</p>
              </motion.div>
            ) : (
              <div className="overflow-hidden">
                <AnimatePresence>
                  {notification && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mb-4 p-3 rounded-md ${
                        notification.type === "success"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {notification.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted/50 px-6 py-4 grid grid-cols-12 font-medium text-sm">
                    <div className="col-span-3">Nom</div>
                    <div className="col-span-3">Adresse</div>
                    <div className="col-span-3">Ville</div>
                    <div className="col-span-3">Actions</div>
                  </div>

                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="divide-y">
                    <AnimatePresence>
                      {entreprises.map((entreprise) => (
                        <motion.div
                          key={entreprise.id_entreprise}
                          variants={itemVariants}
                          exit="exit"
                          layout
                          className="grid grid-cols-12 px-6 py-4 items-center hover:bg-muted/20 transition-colors"
                        >
                          <div className="col-span-3 font-medium">{entreprise.nom_entreprise}</div>
                          <div className="col-span-3 text-muted-foreground">{entreprise.rue_entreprise}</div>
                          <div className="col-span-3">
                            <Badge variant="outline" className="bg-muted/30">
                              {entreprise.ville_entreprise}
                            </Badge>
                          </div>
                          <div className="col-span-3 flex space-x-2">
                            <Button
                              onClick={() => handleValidation(entreprise.id_entreprise, "valider")}
                              disabled={processing === entreprise.id_entreprise}
                              className="bg-green-500 hover:bg-green-600 text-white"
                              size="sm"
                            >
                              {processing === entreprise.id_entreprise ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                              ) : (
                                <CheckCircle className="h-4 w-4 mr-1" />
                              )}
                              Valider
                            </Button>
                            <Button
                              onClick={() => handleValidation(entreprise.id_entreprise, "refuser")}
                              disabled={processing === entreprise.id_entreprise}
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                              size="sm"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Refuser
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
