"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">La problématique</h2>
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
                      Processus de gestion des stages <span className="font-bold">complexe et fragmenté</span>
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                    2
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Communication difficile</span> entre étudiants, entreprises et
                      établissements
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    3
                  </div>
                  <div>
                    <p>
                      Suivi administratif <span className="font-bold">chronophage et source d'erreurs</span>
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                    4
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Manque de visibilité</span> sur l'avancement des stages
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
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Problématique"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Notre solution</h2>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-card rounded-xl p-6 border shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-4">StageDirect</h3>
              <p className="text-lg mb-6">
                Une plateforme centralisée qui connecte tous les acteurs du processus de stage
              </p>
              <ul className="space-y-3">
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
                  <span>Communication en temps réel</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
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
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl blur-xl" />
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Solution StageDirect"
                  width={500}
                  height={400}
                  className="relative rounded-lg shadow-lg"
                />
              </div>
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
                description: "Processus simplifié pour valider les entreprises partenaires",
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
                description: "Publication et recherche d'offres avec filtres avancés",
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
                title: "Communication intégrée",
                description: "Échanges facilités entre tous les acteurs",
                color: "from-pink-500/20 to-pink-600/20",
                delay: 1.1,
              },
              {
                title: "Rapports et analyses",
                description: "Statistiques détaillées pour optimiser le processus",
                color: "from-indigo-500/20 to-indigo-600/20",
                delay: 1.3,
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
                title: "Entreprises",
                benefits: [
                  "Publication facile d'offres de stage",
                  "Gestion des candidatures centralisée",
                  "Évaluation simplifiée des stagiaires",
                  "Visibilité auprès des établissements",
                ],
                color: "bg-amber-100 dark:bg-amber-900/30",
                textColor: "text-amber-700 dark:text-amber-300",
                delay: 0.6,
              },
              {
                title: "Établissements",
                benefits: [
                  "Validation des entreprises partenaires",
                  "Suivi global des étudiants",
                  "Statistiques et rapports détaillés",
                  "Gestion administrative allégée",
                ],
                color: "bg-green-100 dark:bg-green-900/30",
                textColor: "text-green-700 dark:text-green-300",
                delay: 0.9,
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Le processus</h2>
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
                    description: "Les entreprises publient leurs offres de stage",
                    delay: 0.6,
                  },
                  {
                    title: "Recherche et candidature",
                    description: "Les étudiants recherchent et postulent aux offres",
                    delay: 0.9,
                  },
                  {
                    title: "Sélection et validation",
                    description: "Les entreprises sélectionnent les candidats et les établissements valident",
                    delay: 1.2,
                  },
                  {
                    title: "Suivi du stage",
                    description: "Tous les acteurs suivent l'avancement via le tableau Kanban",
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

    // Diapositive 7: Avantages
    {
      id: "benefits",
      content: (
        <div className="flex flex-col h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Avantages clés</h2>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="space-y-6">
                {[
                  {
                    title: "Gain de temps considérable",
                    description: "Réduction de 70% du temps consacré aux tâches administratives",
                    delay: 0.4,
                  },
                  {
                    title: "Amélioration de la communication",
                    description: "Tous les échanges centralisés sur une seule plateforme",
                    delay: 0.6,
                  },
                  {
                    title: "Suivi en temps réel",
                    description: "Visibilité complète sur l'avancement de chaque stage",
                    delay: 0.8,
                  },
                  {
                    title: "Réduction des erreurs",
                    description: "Automatisation des processus de validation et de vérification",
                    delay: 1.0,
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: benefit.delay, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl" />
                <div className="relative p-1 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full">
                  <div className="bg-background rounded-full p-4">
                    <div className="w-64 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-primary mb-2">+40%</div>
                        <div className="text-xl">d'efficacité</div>
                      </div>
                    </div>
                  </div>
                </div>
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

