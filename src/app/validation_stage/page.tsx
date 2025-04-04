"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Importer framer-motion en haut du fichier
import { motion, AnimatePresence } from "framer-motion"

interface Stage {
  id: number
  intitulé: string
  date: Date
  valider: boolean
}

export default function ValidationStagePage() {
  const [stages, setStages] = useState<Stage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [processingIds, setProcessingIds] = useState<number[]>([])

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await fetch("/api/valider_stages")
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des stages")
        }
        const data = await response.json()
        setStages(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Une erreur inconnue est survenue.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchStages()
  }, [])

  const handleValidation = async (id_stage: number) => {
    setProcessingIds((prev) => [...prev, id_stage])
    try {
      const response = await fetch("/api/valider_stages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_stage, action: "valider" }),
      })
      if (!response.ok) {
        throw new Error("Erreur lors de la validation du stage")
      }
      // Refresh the stages after validation
      const updatedStages = stages.map((stage) => (stage.id === id_stage ? { ...stage, valider: true } : stage))
      setStages(updatedStages)
      setMessage("Stage validé avec succès!")
      setError("")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Une erreur inconnue est survenue.")
      }
      setMessage("")
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== id_stage))
    }
  }

  const handleRejection = async (id_stage: number) => {
    setProcessingIds((prev) => [...prev, id_stage])
    try {
      const response = await fetch("/api/valider_stages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_stage, action: "refuser" }),
      })
      if (!response.ok) {
        throw new Error("Erreur lors du refus du stage")
      }
      // Refresh the stages after rejection
      const updatedStages = stages.map((stage) => (stage.id === id_stage ? { ...stage, valider: false } : stage))
      setStages(updatedStages)
      setMessage("Stage refusé avec succès!")
      setError("")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Une erreur inconnue est survenue.")
      }
      setMessage("")
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== id_stage))
    }
  }

  // Format date function
  const formatDate = (date: Date) => {
    return format(new Date(date), "dd MMMM yyyy", { locale: fr })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Validation des Stages</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Validation des Stages
      </motion.h1>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Succès</AlertTitle>
              <AlertDescription className="text-green-700">{message}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="mb-6 bg-red-50 border-red-200">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Erreur</AlertTitle>
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {stages.length === 0 ? (
        <motion.div
          className="text-center py-12 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-500">Aucun stage à valider pour le moment.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="w-full"
            >
              <Card className="w-full h-full border-2 transition-colors duration-300 hover:border-gray-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{stage.intitulé}</CardTitle>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${stage.id}-${stage.valider}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge variant={stage.valider ? "success" : "secondary"}>
                          {stage.valider ? "Validé" : "En attente"}
                        </Badge>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <CardDescription>Date: {formatDate(stage.date)}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end gap-2 pt-4">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      onClick={() => handleRejection(stage.id)}
                      disabled={processingIds.includes(stage.id)}
                      className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 transition-all duration-300"
                    >
                      {processingIds.includes(stage.id) ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4" />
                      )}
                      Refuser
                    </Button>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleValidation(stage.id)}
                      disabled={processingIds.includes(stage.id)}
                      className="bg-green-600 hover:bg-green-700 transition-all duration-300"
                    >
                      {processingIds.includes(stage.id) ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      Valider
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

