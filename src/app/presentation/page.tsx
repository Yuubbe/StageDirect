"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Gestion des touches clavier pour la navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "Escape") {
        if (isFullscreen) {
          document.exitFullscreen().catch(() => {})
          setIsFullscreen(false)
        }
      } else if (e.key === "f") {
        toggleFullscreen()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, isFullscreen])

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen().catch(() => {})
      }
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
      setIsFullscreen(false)
    }
  }

  // Définition des diapositives
  const slides = [
    // Diapositive 1: Page de titre
    {
      id: "title",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Présentation du projet
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">StageDirect</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              La plateforme qui révolutionne la gestion des stages
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-sm text-muted-foreground"
          >
            {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
          </motion.div>
        </div>
      ),
    },

    // Diapositive 2: Problématique
    {
      id: "problem",
      content: (
        <div className="flex flex-col h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Sommaire</h2>
          </motion.div>

          <div className="flex-1 flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex-1"
            >
              <ul className="space-y-6 text-xl">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 font-bold">
                    1
                  </div>
                  <div>
                    <p>
                      Contexte
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                    2
                  </div>
                  <div>
                    <p>
                      Fonctionnalités clés
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    3
                  </div>
                  <div>
                    <p>
                      Pour qui ?
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                    4
                  </div>
                  <div>
                    <p>
                      Comment ça marche ?
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-orange-600 dark:text-purple-400 font-bold">
                    5
                  </div>
                  <div>
                    <p>
                      Cahier des Charges
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-pink-600 dark:text-purple-400 font-bold">
                    6
                  </div>
                  <div>
                    <p>
                      Modèle Logique de données
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-green-600 dark:text-purple-400 font-bold">
                    7
                  </div>
                  <div>
                    <p>
                      Démo du logiciel
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex-1 flex justify-center"
            >
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-full blur-2xl" />
                <div className="relative w-full h-full flex items-center justify-center">
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ),
    },

    // Diapositive 3: Notre solution
    {
      id: "solution",
      content: (
        <div className="flex flex-col h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Contexte</h2>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-card rounded-xl p-12 border shadow-lg w-full"
            >
              <h3 className="text-4xl font-bold mb-8">StageDirect</h3>
              <p className="text-2xl mb-10">
                StageDirect est une plateforme demandé par le lycée Notre-Dame-De-La-Providence à Avranches afin de simplifier l'obtention et la gestion des stages pour les étudiants. 
              </p>
              <ul className="space-y-6">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Interface intuitive et moderne</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Automatisation des tâches administratives</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Suivi visuel avec tableau Kanban</span>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              
            </motion.div>
          </div>
        </div>
      ),
    },

    // Diapositive 4: Fonctionnalités clés
    {
      id: "features",
      content: (
        <div className="flex flex-col h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Fonctionnalités clés</h2>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Validation Entreprises",
                description: "Les étudiants rentrent les informations de l'entreprises afin que l'entreprise soit stocké dans la base de donnée",
                color: "from-blue-500/20 to-blue-600/20",
                delay: 0.3,
              },
              {
                title: "Tableau Kanban",
                description: "Visualisation intuitive de l'avancement des stages",
                color: "from-green-500/20 to-green-600/20",
                delay: 0.5,
              },
              {
                title: "Gestion des stages",
                description: "facilitation à la gestion des stages pour les professeurs",
                color: "from-amber-500/20 to-amber-600/20",
                delay: 0.7,
              },
              {
                title: "Espace administrateur",
                description: "Contrôle complet de la plateforme",
                color: "from-purple-500/20 to-purple-600/20",
                delay: 0.9,
              },
              {
                title: "Communication avec les entreprises",
                description: "liste des contacts des entreprises afin de facilité de recherche de stage",
                color: "from-pink-500/20 to-pink-600/20",
                delay: 1.1,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.5 }}
                className="bg-card rounded-xl p-6 border shadow-sm relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50`} />
                <div className="relative">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },

    // Diapositive 5: Pour qui ?
    {
      id: "users",
      content: (
        <div className="flex flex-col h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Pour qui ?</h2>
          </motion.div>

          <div className="flex-1 flex flex-col md:flex-row gap-8 items-stretch">
            {[
              {
                title: "Étudiants",
                benefits: [
                  "Recherche simplifiée de stages",
                  "Candidature en quelques clics",
                  "Suivi de progression personnalisé",
                  "Communication directe avec les tuteurs",
                ],
                color: "bg-blue-100 dark:bg-blue-900/30",
                textColor: "text-blue-700 dark:text-blue-300",
                delay: 0.3,
              },

              {
                title: "Établissements",
                benefits: [
                  "Validation des entreprises et des stages des étudiants",
                  "Suivi global des étudiants",
                  "Gestion administrative allégée",
                ],
                color: "bg-green-100 dark:bg-green-900/30",
                textColor: "text-green-700 dark:text-green-300",
                delay: 0.6,
              },
            ].map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: user.delay, duration: 0.8 }}
                className="flex-1 bg-card rounded-xl p-6 border shadow-sm flex flex-col"
              >
                <div
                  className={`${user.color} rounded-full w-12 h-12 flex items-center justify-center ${user.textColor} font-bold text-lg mb-4`}
                >
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4">{user.title}</h3>
                <ul className="space-y-3 mt-2 flex-1">
                  {user.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: user.delay + 0.2 + i * 0.1, duration: 0.5 }}
                      className="flex items-start gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full ${user.textColor} mt-2`} />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },

    // Diapositive 6: Processus
    {
      id: "process",
      content: (
        <div className="flex flex-col h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Comment ça marche ?</h2>
          </motion.div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-muted" />

                {[
                  {
                    title: "Inscription et configuration",
                    description: "Les établissements, entreprises et étudiants créent leurs profils",
                    delay: 0.3,
                  },
                  {
                    title: "Publication des offres",
                    description: "Une liste des entreprises est fournis pour faciliter la recherche de stage",
                    delay: 0.6,
                  },
                  {
                    title: "Recherche et candidature",
                    description: "Les étudiants contactent les entreprises",
                    delay: 0.9,
                  },
                  {
                    title: "Sélection et validation",
                    description: "Une fois le stage accepté, l'étudiant n'a plus qu'à remplir le formulaire de ce stage et qu'un professeur le valide",
                    delay: 1.2,
                  },
                  {
                    title: "Suivi du stage",
                    description: "les professeurs suivent l'avancement du stage via le tableau Kanban que l'étudiant remplit au fur et à mesure. ",
                    delay: 1.5,
                  },
                  {
                    title: "Évaluation finale",
                    description: "Évaluation et validation du stage",
                    delay: 1.8,
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: step.delay, duration: 0.5 }}
                    className="relative pl-16 pb-8"
                  >
                    <div className="absolute left-[29px] top-0 w-6 h-6 rounded-full bg-primary transform -translate-x-1/2 flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },

   
    // Diapositive pour le Cahier des Charges
    {
      id: "cdc",
      content: (
        <div className="flex flex-col h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Cahier des Charges</h2>
          </motion.div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-card rounded-xl p-6 border shadow-lg max-w-3xl w-full"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-full md:w-1/2 aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary/40"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <iframe
                    src="/pdf/CDC.pdf"
                    className="absolute inset-0 w-full h-full opacity-80 pointer-events-none"
                    title="Aperçu du Cahier des Charges"
                  />
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-4">
                  <h3 className="text-2xl font-bold">Spécifications du projet</h3>
                  <p className="text-muted-foreground">
                    Le cahier des charges détaille les spécifications techniques et fonctionnelles de la plateforme
                    StageDirect.
                  </p>
                  

                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <Button asChild>
                      <a href="/pdf/CDC.pdf" target="_blank" rel="noopener noreferrer">
                        Ouvrir le document
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/pdf/CDC.pdf" download>
                        Télécharger
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ),
    },

    // Diapositive pour le MCD
    {
      id: "mld",
      content: (
        <div className="flex flex-col h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Modèle Logique de Données</h2>
          </motion.div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative max-w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl blur-xl" />
              <div className="relative p-2 bg-card border rounded-xl shadow-lg">
                <Image
                  src="/img/mcd.png"
                  alt="Modèle Conceptuel de Données"
                  width={800}
                  height={600}
                  className="rounded-lg"
                />

                {/* Légende */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-4 p-3 bg-muted/50 rounded-lg"
                >
                  <h3 className="text-lg font-semibold mb-2">Légende des cardinalités</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-primary/10 px-2 py-1 rounded">1</div>
                      <span>Un à un (1:1)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-primary/10 px-2 py-1 rounded">*</div>
                      <span>Un à plusieurs (1:N) ou plusieurs à plusieurs (N:M)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-primary/10 px-2 py-1 rounded">0..1</div>
                      <span>Optionnel, un ou aucun (0..1)</span>
                    </div>
                  </div><div className="mt-6 p-4 bg-muted rounded-lg">
                          <h3 className="text-lg font-semibold mb-3">Résumé des cardinalités</h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <li>Utilisateur → Stage : 1 à 0..1</li>
                            <li>Stage → Utilisateur : 0..1 à 1</li>
                            <li>Stage → Entreprise : 0..1 à 1</li>
                            <li>Entreprise → Stage : 1 à *</li>
                            <li>Stage → Contact : 1 à 0..*</li>
                            <li>Contact → Stage : 0..* à 1</li>
                            <li>Entreprise → SecteurActivite : 1 à 1</li>
                            <li>SecteurActivite → Entreprise : 1 à *</li>
                            <li>Entreprise → Contact : 0..1 à 0..1</li>
                            <li>Contact → Entreprise : 0..1 à 0..1</li>
                          </ul>
                        </div>
                </motion.div>

                {/* Bouton d'explication */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="mt-3 flex justify-center"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Info className="h-4 w-4" />
                        Explication des relations
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl">Explication des relations du MLD</DialogTitle>
                        <DialogDescription>Détail des cardinalités entre les entités du modèle</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6 mt-4">
                        <div className="space-y-2">
                          <div className="pl-4 border-l-2 border-primary/20 space-y-1">
                            <p>Utilisateur → Stage : Un utilisateur peut être associé à un seul stage.</p><br></br>
                            <p>Stage → Utilisateur : Un stage peut être associé à un seul utilisateur.</p><br></br>
                            <p className="text-muted-foreground">
                              Un stage peut ne pas être associé à un utilisateur, mais s'il l'est,
                              il est associé à un seul utilisateur
                            </p><br></br>
                            <p className="font-medium mt-1">
                              Un utilisateur a un stage, et un stage peut avoir un utilisateur
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="pl-4 border-l-2 border-primary/20 space-y-1">
                            <p>
                              Stage → Entreprise : Un stage peut être associé à une entreprise .
                            </p>
                            <p className="text-muted-foreground">
                              Un stage peut ne pas être associé à une entreprise, mais s'il l'est,
                              il est associé à une seule entreprise
                            </p><br></br>
                            <p>Entreprise → Stage : Une entreprise peut avoir plusieurs stages.</p>
                            <p className="text-muted-foreground">
                              Une entreprise peut être associée à plusieurs stages
                            </p><br></br>
                            <p className="font-medium mt-1">
                              Un stage peut être associé à une entreprise, mais une entreprise peut
                              avoir plusieurs stages
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="pl-4 border-l-2 border-primary/20 space-y-1">
                            <p>Stage → Contact : Un stage est associé à un contact.</p>
                            <p className="text-muted-foreground">
                             Chaque stage est associé à un contact
                            </p><br></br>
                            <p>Contact → Stage : Un contact peut être associé à plusieurs stages.</p>
                            <p className="text-muted-foreground">
                              Un contact peut être lié à plusieurs stages
                            </p><br></br>
                            <p className="font-medium mt-1">
                             Un stage a un contact, et un contact peut être lié à plusieurs
                              stages
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="pl-4 border-l-2 border-primary/20 space-y-1">
                            <p>Entreprise → SecteurActivite : Une entreprise est liée à un secteur d'activité.</p>
                            <p className="text-muted-foreground">
                              Chaque entreprise appartient à un secteur d'activité
                            </p><br></br>
                            <p>
                              SecteurActivite → Entreprise : Un secteur d'activité peut concerner plusieurs entreprises.
                            </p>
                            <p className="text-muted-foreground">
                              Un secteur d'activité peut inclure plusieurs entreprises
                            </p><br></br>
                            <p className="font-medium mt-1">
                              Un secteur d'activité peut avoir plusieurs entreprises
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="pl-4 border-l-2 border-primary/20 space-y-1">
                            <p>Entreprise → Contact : Une entreprise peut avoir un contact.</p>
                            <p className="text-muted-foreground">
                              Une entreprise peut avoir un contact ou aucun contact
                            </p><br></br>
                            <p>Contact → Entreprise : Un contact peut être lié à une entreprise.</p>
                            <p className="text-muted-foreground">
                              Un contact peut être associé à une entreprise
                            </p>
                            <p className="font-medium mt-1">Relation : 0..1 à 0..1</p>
                          </div>
                        </div>

                        
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      ),
    },

    // Diapositive 8: Conclusion
    {
      id: "conclusion",
      content: (
        <div className="flex flex-col h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
              Prêt à simplifier la gestion de vos stages ?
            </h2>
          </motion.div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-2xl mb-8"
            >
              <p className="text-xl mb-6">
                StageDirect vous offre une solution complète pour connecter étudiants, entreprises et établissements
                d'enseignement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/inscription">Commencer gratuitement</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Demander une démo</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-sm text-muted-foreground mt-8"
            >
              <p>© StageDirect {new Date().getFullYear()} - Tous droits réservés</p>
            </motion.div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Contrôles de présentation */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => (window.location.href = "/")}
          className="bg-background/80 backdrop-blur-sm"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={toggleFullscreen} className="bg-background/80 backdrop-blur-sm">
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation des diapositives */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
        <Button variant="ghost" size="icon" onClick={prevSlide} disabled={currentSlide === 0} className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-primary w-4" : "bg-muted hover:bg-muted-foreground/50"
              }`}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="ml-2 text-xs text-muted-foreground">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Contenu des diapositives */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 py-16 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Instructions d'utilisation */}
      <div className="fixed bottom-20 right-4 z-40">
        <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border text-xs text-muted-foreground">
          <p className="font-medium mb-1">Raccourcis clavier :</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">←</kbd>
              <span>Diapositive précédente</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">→</kbd>
              <span>Diapositive suivante</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">F</kbd>
              <span>Plein écran</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Esc</kbd>
              <span>Quitter le plein écran</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

