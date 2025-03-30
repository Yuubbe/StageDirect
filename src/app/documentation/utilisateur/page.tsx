"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ChevronDown, Search, ArrowLeft, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UserDocumentation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("introduction")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    introduction: true,
    getting_started: false,
    features: false,
    roles: false,
    faq: false,
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const navigateToSection = (section: string) => {
    setActiveSection(section)
    setExpandedSections((prev) => ({
      ...prev,
      [section.split("-")[0]]: true,
    }))
    setIsMobileMenuOpen(false)
  }

  const filteredContent = () => {
    if (!searchQuery) return sections

    return sections.filter((section) => {
      const sectionContent = section.title.toLowerCase() + " " + section.content.toLowerCase()
      return sectionContent.includes(searchQuery.toLowerCase())
    })
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/documentation/technique" className="text-sm font-medium hover:underline">
              Documentation Technique
            </Link>
            <Button asChild size="sm">
              <Link href="/contact">Contacter le support</Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b"
          >
            <div className="container py-4 space-y-4">
              <Link
                href="/documentation/technique"
                className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Documentation Technique</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Contacter le support</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <div className="pt-2 border-t">
                <p className="text-sm font-medium mb-2">Sections</p>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className={`flex items-center justify-between w-full p-2 text-left rounded-md ${
                      activeSection === item.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => navigateToSection(item.id)}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block md:col-span-3 lg:col-span-2 space-y-6"
          >
            <div className="sticky top-24">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <nav className="mt-6 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className={`flex items-center justify-between w-full p-2 text-sm rounded-md ${
                      activeSection === item.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                    }`}
                    onClick={() => navigateToSection(item.id)}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-9 lg:col-span-10"
          >
            <div className="prose prose-blue max-w-none dark:prose-invert">
              <h1 className="text-4xl font-bold mb-6">Documentation Utilisateur StageDirect</h1>

              <div className="mb-8">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="student">Étudiants</TabsTrigger>
                    <TabsTrigger value="company">Entreprises</TabsTrigger>
                    <TabsTrigger value="school">Établissements</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-0">
                    <p className="text-muted-foreground">
                      Bienvenue dans la documentation utilisateur de StageDirect. Cette documentation vous guidera à
                      travers les différentes fonctionnalités de la plateforme, quel que soit votre rôle.
                    </p>
                  </TabsContent>
                  <TabsContent value="student" className="mt-0">
                    <p className="text-muted-foreground">
                      Documentation spécifique pour les étudiants utilisant StageDirect pour trouver et gérer leurs
                      stages.
                    </p>
                  </TabsContent>
                  <TabsContent value="company" className="mt-0">
                    <p className="text-muted-foreground">
                      Documentation pour les entreprises souhaitant publier des offres de stage et gérer leurs
                      stagiaires.
                    </p>
                  </TabsContent>
                  <TabsContent value="school" className="mt-0">
                    <p className="text-muted-foreground">
                      Documentation pour les établissements d'enseignement supervisant les stages de leurs étudiants.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              {searchQuery ? (
                <div className="space-y-8">
                  <p>
                    Résultats de recherche pour: <Badge variant="outline">{searchQuery}</Badge>
                  </p>
                  {filteredContent().length > 0 ? (
                    filteredContent().map((section) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 border rounded-lg"
                      >
                        <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                      </motion.div>
                    ))
                  ) : (
                    <p>Aucun résultat trouvé pour votre recherche.</p>
                  )}
                </div>
              ) : (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
                  {/* Introduction */}
                  <motion.section id="introduction" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Introduction</h2>
                      <Button variant="ghost" size="sm" onClick={() => toggleSection("introduction")}>
                        {expandedSections.introduction ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {expandedSections.introduction && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-4"
                      >
                        <p>
                          StageDirect est une plateforme complète de gestion des stages qui connecte les étudiants, les
                          entreprises et les établissements d'enseignement. Notre objectif est de simplifier le
                          processus de recherche, de candidature et de suivi des stages pour tous les acteurs impliqués.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                          <Card>
                            <CardContent className="pt-6">
                              <h3 className="text-lg font-semibold mb-2">Pour les étudiants</h3>
                              <p className="text-sm text-muted-foreground">
                                Trouvez facilement des stages correspondant à vos compétences et aspirations.
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <h3 className="text-lg font-semibold mb-2">Pour les entreprises</h3>
                              <p className="text-sm text-muted-foreground">
                                Recrutez les meilleurs talents et gérez efficacement vos offres de stage.
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <h3 className="text-lg font-semibold mb-2">Pour les écoles</h3>
                              <p className="text-sm text-muted-foreground">
                                Suivez le parcours de vos étudiants et développez vos partenariats.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    )}
                  </motion.section>

                  {/* Getting Started */}
                  <motion.section id="getting_started" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Démarrage</h2>
                      <Button variant="ghost" size="sm" onClick={() => toggleSection("getting_started")}>
                        {expandedSections.getting_started ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {expandedSections.getting_started && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-4"
                      >
                        <h3 className="text-xl font-semibold" id="getting_started-inscription">
                          Inscription
                        </h3>
                        <p>
                          Pour commencer à utiliser StageDirect, vous devez créer un compte en fonction de votre rôle :
                        </p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Accédez à la page d'accueil de StageDirect</li>
                          <li>Cliquez sur le bouton "Inscription" dans le coin supérieur droit</li>
                          <li>Remplissez le formulaire avec vos informations personnelles</li>
                          <li>Validez votre inscription en cliquant sur "Enregistrer l'utilisateur"</li>
                        </ol>
                        <div className="my-6 border p-4 rounded-lg bg-muted/30">
                          <p className="font-medium">Note importante :</p>
                          <p className="text-sm text-muted-foreground">
                            Après l'inscription, vous serez automatiquement redirigé vers la page de connexion. Utilisez
                            l'email et le mot de passe que vous avez définis pour vous connecter.
                          </p>
                        </div>

                        <h3 className="text-xl font-semibold mt-8" id="getting_started-connexion">
                          Connexion
                        </h3>
                        <p>Pour vous connecter à votre compte StageDirect :</p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Accédez à la page d'accueil de StageDirect</li>
                          <li>Cliquez sur le bouton "Connexion" dans le coin supérieur droit</li>
                          <li>Entrez votre email et votre mot de passe</li>
                          <li>Cliquez sur "Se connecter"</li>
                        </ol>

                        <div className="mt-6 rounded-lg overflow-hidden border">
                          <div className="bg-muted/50 p-2 text-sm font-medium">Aperçu de l'interface de connexion</div>
                          <div className="p-4 flex justify-center">
                            <Image
                              src="/placeholder.svg?height=300&width=500"
                              alt="Interface de connexion"
                              width={500}
                              height={300}
                              className="rounded border"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.section>

                  {/* Features */}
                  <motion.section id="features" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Fonctionnalités</h2>
                      <Button variant="ghost" size="sm" onClick={() => toggleSection("features")}>
                        {expandedSections.features ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {expandedSections.features && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-8"
                      >
                        <div id="features-entreprises">
                          <h3 className="text-xl font-semibold">Gestion des entreprises</h3>
                          <p className="mt-2">
                            StageDirect permet de gérer efficacement les entreprises partenaires. Vous pouvez consulter
                            la liste des entreprises, ajouter de nouvelles entreprises et gérer les entreprises
                            existantes.
                          </p>
                          <div className="mt-4 space-y-2">
                            <h4 className="font-medium">Fonctionnalités principales :</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Consultation de la liste des entreprises</li>
                              <li>Ajout de nouvelles entreprises</li>
                              <li>Validation des entreprises par les administrateurs</li>
                              <li>Détection et gestion des doublons</li>
                            </ul>
                          </div>
                        </div>

                        <div id="features-contacts">
                          <h3 className="text-xl font-semibold">Gestion des contacts</h3>
                          <p className="mt-2">
                            La gestion des contacts vous permet de maintenir une base de données des personnes à
                            contacter au sein des entreprises partenaires.
                          </p>
                          <div className="mt-4 space-y-2">
                            <h4 className="font-medium">Fonctionnalités principales :</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Consultation de la liste des contacts</li>
                              <li>Ajout de nouveaux contacts</li>
                              <li>Association des contacts aux entreprises</li>
                              <li>Fusion des contacts dupliqués</li>
                            </ul>
                          </div>
                        </div>

                        <div id="features-stages">
                          <h3 className="text-xl font-semibold">Gestion des stages</h3>
                          <p className="mt-2">
                            StageDirect facilite la gestion complète des stages, de la création à la validation finale.
                          </p>
                          <div className="mt-4 space-y-2">
                            <h4 className="font-medium">Fonctionnalités principales :</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Création de nouvelles offres de stage</li>
                              <li>Association des stages aux entreprises et contacts</li>
                              <li>Suivi de l'avancement des stages</li>
                              <li>Évaluation des stages</li>
                            </ul>
                          </div>
                        </div>

                        <div id="features-kanban">
                          <h3 className="text-xl font-semibold">Tableau Kanban</h3>
                          <p className="mt-2">
                            Le tableau Kanban offre une visualisation intuitive de l'avancement des stages, permettant
                            de suivre facilement leur progression.
                          </p>
                          <div className="mt-4 space-y-2">
                            <h4 className="font-medium">Fonctionnalités principales :</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Organisation des stages par colonnes (À faire, En cours, Terminé, etc.)</li>
                              <li>Glisser-déposer pour mettre à jour le statut</li>
                              <li>Ajout de notes et commentaires</li>
                              <li>Sauvegarde automatique des modifications</li>
                            </ul>
                          </div>
                          <div className="mt-6 rounded-lg overflow-hidden border">
                            <div className="bg-muted/50 p-2 text-sm font-medium">Aperçu du tableau Kanban</div>
                            <div className="p-4 flex justify-center">
                              <Image
                                src="/placeholder.svg?height=300&width=500"
                                alt="Tableau Kanban"
                                width={500}
                                height={300}
                                className="rounded border"
                              />
                            </div>
                          </div>
                        </div>

                        <div id="features-admin">
                          <h3 className="text-xl font-semibold">Administration</h3>
                          <p className="mt-2">
                            Les fonctionnalités d'administration permettent de gérer les utilisateurs, les rôles et les
                            permissions.
                          </p>
                          <div className="mt-4 space-y-2">
                            <h4 className="font-medium">Fonctionnalités principales :</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Gestion des utilisateurs (création, modification, suppression)</li>
                              <li>Attribution des rôles (Utilisateur, Professeur, Admin, SuperAdmin)</li>
                              <li>Validation des entreprises</li>
                              <li>Supervision globale de la plateforme</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.section>

                  {/* User Roles */}
                  <motion.section id="roles" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Rôles utilisateurs</h2>
                      <Button variant="ghost" size="sm" onClick={() => toggleSection("roles")}>
                        {expandedSections.roles ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {expandedSections.roles && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-6"
                      >
                        <p>
                          StageDirect propose différents rôles utilisateurs, chacun avec des permissions et des
                          fonctionnalités spécifiques.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card id="roles-user">
                            <CardContent className="pt-6">
                              <h3 className="text-lg font-semibold mb-2">Utilisateur (USER)</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Rôle de base pour les étudiants cherchant des stages.
                              </p>
                              <h4 className="text-sm font-medium mb-2">Permissions :</h4>
                              <ul className="list-disc pl-6 text-sm space-y-1">
                                <li>Consulter les offres de stage</li>
                                <li>Postuler aux offres</li>
                                <li>Gérer son profil</li>
                                <li>Suivre l'avancement de ses candidatures</li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card id="roles-professeur">
                            <CardContent className="pt-6">
                              <h3 className="text-lg font-semibold mb-2">Professeur (PROFESSEUR)</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Rôle pour les enseignants supervisant les stages.
                              </p>
                              <h4 className="text-sm font-medium mb-2">Permissions :</h4>
                              <ul className="list-disc pl-6 text-sm space-y-1">
                                <li>Consulter les stages de ses étudiants</li>
                                <li>Valider les conventions de stage</li>
                                <li>Communiquer avec les entreprises</li>
                                <li>Évaluer les stages</li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card id="roles-admin">
                            <CardContent className="pt-6">
                              <h3 className="text-lg font-semibold mb-2">Administrateur (ADMIN)</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Rôle pour la gestion administrative de la plateforme.
                              </p>
                              <h4 className="text-sm font-medium mb-2">Permissions :</h4>
                              <ul className="list-disc pl-6 text-sm space-y-1">
                                <li>Gérer les utilisateurs</li>
                                <li>Valider les entreprises</li>
                                <li>Gérer les offres de stage</li>
                                <li>Accéder aux statistiques</li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card id="roles-superadmin">
                            <CardContent className="pt-6">
                              <h3 className="text-lg font-semibold mb-2">Super Administrateur (SUPERADMIN)</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Rôle avec accès complet à toutes les fonctionnalités.
                              </p>
                              <h4 className="text-sm font-medium mb-2">Permissions :</h4>
                              <ul className="list-disc pl-6 text-sm space-y-1">
                                <li>Toutes les permissions d'administrateur</li>
                                <li>Gérer les rôles des utilisateurs</li>
                                <li>Configurer la plateforme</li>
                                <li>Accès aux fonctionnalités avancées</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    )}
                  </motion.section>

                  {/* FAQ */}
                  <motion.section id="faq" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">FAQ</h2>
                      <Button variant="ghost" size="sm" onClick={() => toggleSection("faq")}>
                        {expandedSections.faq ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {expandedSections.faq && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-6"
                      >
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <h3 className="font-semibold">Comment puis-je modifier mon profil ?</h3>
                            <p className="mt-2 text-muted-foreground">
                              Pour modifier votre profil, connectez-vous à votre compte, cliquez sur votre avatar dans
                              le coin supérieur droit, puis sélectionnez "Profil". Vous pourrez alors modifier vos
                              informations personnelles.
                            </p>
                          </div>

                          <div className="border rounded-lg p-4">
                            <h3 className="font-semibold">Comment ajouter une nouvelle entreprise ?</h3>
                            <p className="mt-2 text-muted-foreground">
                              Pour ajouter une nouvelle entreprise, accédez à la section "Entreprises" depuis le menu
                              principal, puis cliquez sur le bouton "Ajouter une entreprise". Remplissez le formulaire
                              avec les informations de l'entreprise et soumettez-le.
                            </p>
                          </div>

                          <div className="border rounded-lg p-4">
                            <h3 className="font-semibold">Comment utiliser le tableau Kanban ?</h3>
                            <p className="mt-2 text-muted-foreground">
                              Le tableau Kanban vous permet de suivre visuellement l'avancement des stages. Vous pouvez
                              créer des colonnes représentant différentes étapes (par exemple, "À faire", "En cours",
                              "Terminé"), puis déplacer les cartes de stage d'une colonne à l'autre en fonction de leur
                              progression.
                            </p>
                          </div>

                          <div className="border rounded-lg p-4">
                            <h3 className="font-semibold">Comment fusionner des contacts dupliqués ?</h3>
                            <p className="mt-2 text-muted-foreground">
                              Pour fusionner des contacts dupliqués, accédez à la section "Contacts", puis à l'onglet
                              "Contacts dupliqués". Sélectionnez les contacts à fusionner et cliquez sur le bouton
                              "Fusionner". Vous pouvez également utiliser le bouton "Tout fusionner" pour traiter tous
                              les doublons en une seule fois.
                            </p>
                          </div>

                          <div className="border rounded-lg p-4">
                            <h3 className="font-semibold">Comment changer le rôle d'un utilisateur ?</h3>
                            <p className="mt-2 text-muted-foreground">
                              Seuls les administrateurs peuvent changer les rôles des utilisateurs. Si vous êtes
                              administrateur, accédez à la section "Admin", puis à la liste des utilisateurs. Vous
                              pourrez alors modifier le rôle de chaque utilisateur à l'aide du menu déroulant dans la
                              colonne "Rôle".
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.section>
                </motion.div>
              )}
            </div>
          </motion.main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">© {new Date().getFullYear()} StageDirect</span>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-foreground transition-colors">
              Confidentialité
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Menu items for navigation
const menuItems = [
  { id: "introduction", label: "Introduction" },
  { id: "getting_started-inscription", label: "Inscription" },
  { id: "getting_started-connexion", label: "Connexion" },
  { id: "features-entreprises", label: "Gestion des entreprises" },
  { id: "features-contacts", label: "Gestion des contacts" },
  { id: "features-stages", label: "Gestion des stages" },
  { id: "features-kanban", label: "Tableau Kanban" },
  { id: "features-admin", label: "Administration" },
  { id: "roles-user", label: "Rôle Utilisateur" },
  { id: "roles-professeur", label: "Rôle Professeur" },
  { id: "roles-admin", label: "Rôle Administrateur" },
  { id: "roles-superadmin", label: "Rôle Super Admin" },
  { id: "faq", label: "FAQ" },
]

// Sections content for search functionality
const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content:
      "StageDirect est une plateforme complète de gestion des stages qui connecte les étudiants, les entreprises et les établissements d'enseignement. Notre objectif est de simplifier le processus de recherche, de candidature et de suivi des stages pour tous les acteurs impliqués.",
  },
  {
    id: "getting_started-inscription",
    title: "Inscription",
    content:
      "Pour commencer à utiliser StageDirect, vous devez créer un compte en fonction de votre rôle. Accédez à la page d'accueil de StageDirect, cliquez sur le bouton 'Inscription' dans le coin supérieur droit, remplissez le formulaire avec vos informations personnelles, et validez votre inscription en cliquant sur 'Enregistrer l'utilisateur'.",
  },
  {
    id: "getting_started-connexion",
    title: "Connexion",
    content:
      "Pour vous connecter à votre compte StageDirect, accédez à la page d'accueil de StageDirect, cliquez sur le bouton 'Connexion' dans le coin supérieur droit, entrez votre email et votre mot de passe, puis cliquez sur 'Se connecter'.",
  },
  {
    id: "features-entreprises",
    title: "Gestion des entreprises",
    content:
      "StageDirect permet de gérer efficacement les entreprises partenaires. Vous pouvez consulter la liste des entreprises, ajouter de nouvelles entreprises et gérer les entreprises existantes.",
  },
  {
    id: "features-contacts",
    title: "Gestion des contacts",
    content:
      "La gestion des contacts vous permet de maintenir une base de données des personnes à contacter au sein des entreprises partenaires.",
  },
  {
    id: "features-stages",
    title: "Gestion des stages",
    content: "StageDirect facilite la gestion complète des stages, de la création à la validation finale.",
  },
  {
    id: "features-kanban",
    title: "Tableau Kanban",
    content:
      "Le tableau Kanban offre une visualisation intuitive de l'avancement des stages, permettant de suivre facilement leur progression.",
  },
  {
    id: "features-admin",
    title: "Administration",
    content: "Les fonctionnalités d'administration permettent de gérer les utilisateurs, les rôles et les permissions.",
  },
  {
    id: "roles-user",
    title: "Rôle Utilisateur (USER)",
    content:
      "Rôle de base pour les étudiants cherchant des stages. Permissions : consulter les offres de stage, postuler aux offres, gérer son profil, suivre l'avancement de ses candidatures.",
  },
  {
    id: "roles-professeur",
    title: "Rôle Professeur (PROFESSEUR)",
    content:
      "Rôle pour les enseignants supervisant les stages. Permissions : consulter les stages de ses étudiants, valider les conventions de stage, communiquer avec les entreprises, évaluer les stages.",
  },
  {
    id: "roles-admin",
    title: "Rôle Administrateur (ADMIN)",
    content:
      "Rôle pour la gestion administrative de la plateforme. Permissions : gérer les utilisateurs, valider les entreprises, gérer les offres de stage, accéder aux statistiques.",
  },
  {
    id: "roles-superadmin",
    title: "Rôle Super Administrateur (SUPERADMIN)",
    content:
      "Rôle avec accès complet à toutes les fonctionnalités. Permissions : toutes les permissions d'administrateur, gérer les rôles des utilisateurs, configurer la plateforme, accès aux fonctionnalités avancées.",
  },
]

