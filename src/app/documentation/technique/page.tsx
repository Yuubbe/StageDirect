"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronRight, ChevronDown, Search, ArrowLeft, Menu, X, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TechnicalDocumentation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("architecture")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    architecture: true,
    database: false,
    api: false,
    components: false,
    authentication: false,
    deployment: false,
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

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

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
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
            <Link href="/documentation/utilisateur" className="text-sm font-medium hover:underline">
              Documentation Utilisateur
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
                href="/documentation/utilisateur"
                className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Documentation Utilisateur</span>
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
              <h1 className="text-4xl font-bold mb-6">Documentation Technique StageDirect</h1>

              <div className="mb-8">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                    <TabsTrigger value="frontend">Frontend</TabsTrigger>
                    <TabsTrigger value="backend">Backend</TabsTrigger>
                    <TabsTrigger value="database">Base de données</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-0">
                    <p className="text-muted-foreground">
                      Documentation technique complète de StageDirect, couvrant l'architecture, les composants, les API
                      et les processus de déploiement.
                    </p>
                  </TabsContent>
                  <TabsContent value="frontend" className="mt-0">
                    <p className="text-muted-foreground">
                      Détails sur l'implémentation frontend de StageDirect, utilisant Next.js, React et diverses
                      bibliothèques.
                    </p>
                  </TabsContent>
                  <TabsContent value="backend" className="mt-0">
                    <p className="text-muted-foreground">
                      Informations sur le backend de StageDirect, les API routes et les services.
                    </p>
                  </TabsContent>
                  <TabsContent value="database" className="mt-0">
                    <p className="text-muted-foreground">
                      Documentation sur le schéma de base de données et les relations entre les entités.
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
                  {/* Architecture */}
                  <motion.section id="architecture" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Architecture</h2>
                      <Button variant="ghost" size="sm" onClick={() => toggleSection("architecture")}>
                        {expandedSections.architecture ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {expandedSections.architecture && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-4"
                      >
                        <p>
                          StageDirect est construit sur une architecture moderne basée sur Next.js, utilisant l'App
                          Router pour une navigation fluide et des performances optimales.
                        </p>

                        <div className="mt-6 rounded-lg overflow-hidden border">
                          <div className="bg-muted/50 p-2 text-sm font-medium">Architecture globale</div>
                          <div className="p-4">
                            <div className="bg-muted/30 p-4 rounded-lg">
                              <pre className="text-sm overflow-auto">
                                <code>
                                  {`StageDirect/
├── app/                  # App Router de Next.js
│   ├── api/              # API Routes
│   ├── admin/            # Pages d'administration
│   ├── connexion/        # Page de connexion
│   ├── inscription/      # Page d'inscription
│   ├── entreprises/      # Gestion des entreprises
│   ├── contact/          # Gestion des contacts
│   ├── stages/           # Gestion des stages
│   ├── kanban/           # Tableau Kanban
│   └── ...
├── components/           # Composants React réutilisables
├── lib/                  # Utilitaires et services
├── prisma/               # Configuration Prisma et schéma
└── public/               # Fichiers statiques`}
                                </code>
                              </pre>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-8" id="architecture-stack">
                          Stack technologique
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <Card>
                            <CardContent className="pt-6">
                              <h4 className="font-semibold mb-2">Frontend</h4>
                              <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li>Next.js (App Router)</li>
                                <li>React</li>
                                <li>TypeScript</li>
                                <li>Tailwind CSS</li>
                                <li>shadcn/ui</li>
                                <li>Framer Motion</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <h4 className="font-semibold mb-2">Backend</h4>
                              <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li>Next.js API Routes</li>
                                <li>Prisma ORM</li>
                                <li>TypeScript</li>
                                <li>Middleware</li>
                                <li>Cookies pour l'authentification</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <h4 className="font-semibold mb-2">Base de données</h4>
                              <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li>MySQL</li>
                                <li>Prisma comme ORM</li>
                                <li>Migrations automatisées</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>

                        <h3 className="text-xl font-semibold mt-8" id="architecture-flow">
                          Flux de données
                        </h3>
                        <p className="mt-2">
                          Le flux de données dans StageDirect suit un modèle client-serveur classique avec des
                          améliorations modernes :
                        </p>
                        <ol className="list-decimal pl-6 space-y-2 mt-4">
                          <li>Le client (navigateur) envoie une requête à l'application Next.js</li>
                          <li>Next.js traite la requête via l'App Router</li>
                          <li>
                            Si nécessaire, les API Routes sont appelées pour interagir avec la base de données via
                            Prisma
                          </li>
                          <li>Les données sont renvoyées au client sous forme de JSON</li>
                          <li>React met à jour l'interface utilisateur avec les nouvelles données</li>
                        </ol>
                      </motion.div>
                    )}
                  </motion.section>

                  {/* Database */}
                  <motion.section id="database" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Base de données</h2>
                      <Button variant="ghost" size="sm" onClick={() => toggleSection("database")}>
                        {expandedSections.database ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {expandedSections.database && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-4"
                      >
                        <p>
                          StageDirect utilise MySQL comme système de gestion de base de données relationnelle, avec
                          Prisma comme ORM (Object-Relational Mapping) pour simplifier les interactions avec la base de
                          données.
                        </p>

                        <h3 className="text-xl font-semibold mt-8" id="database-schema">
                          Schéma de la base de données
                        </h3>
                        <p className="mt-2">
                          Le schéma de la base de données est défini dans le fichier <code>prisma/schema.prisma</code>.
                          Voici les principales entités :
                        </p>

                        <div className="mt-4 space-y-4">
                          <div className="bg-muted/30 p-4 rounded-lg relative">
                            <button
                              className="absolute top-2 right-2 p-1 rounded-md hover:bg-muted"
                              onClick={() => copyToClipboard(prismaSchema, "prisma-schema")}
                            >
                              {copiedCode === "prisma-schema" ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                            <pre className="text-sm overflow-auto">
                              <code>{prismaSchema}</code>
                            </pre>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-8" id="database-relations">
                          Relations entre les entités
                        </h3>
                        <div className="mt-4 space-y-4">
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold">Utilisateur - Rôle</h4>
                            <p className="text-sm mt-2">
                              Chaque utilisateur a un rôle spécifique (USER, PROFESSEUR, ADMIN, SUPERADMIN) qui
                              détermine ses permissions dans l'application.
                            </p>
                          </div>
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold">Entreprise - Contact</h4>
                            <p className="text-sm mt-2">
                              Une entreprise peut avoir plusieurs contacts, et un contact peut être associé à plusieurs
                              entreprises (relation many-to-many).
                            </p>
                          </div>
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold">Entreprise - Secteur d'activité</h4>
                            <p className="text-sm mt-2">
                              Chaque entreprise appartient à un secteur d'activité spécifique (relation one-to-many).
                            </p>
                          </div>
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold">Stage - Entreprise - Contact</h4>
                            <p className="text-sm mt-2">
                              Un stage est associé à une entreprise et à un contact spécifique au sein de cette
                              entreprise.
                            </p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-8" id="database-migrations">
                          Migrations
                        </h3>
                        <p className="mt-2">
                          Prisma gère automatiquement les migrations de la base de données. Voici comment créer et
                          appliquer une migration :
                        </p>
                        <div className="bg-muted/30 p-4 rounded-lg mt-4">
                          <pre className="text-sm overflow-auto">
                            <code>
                              {`# Générer une migration après modification du schéma
npx prisma migrate dev --name nom_de_la_migration

# Appliquer les migrations en production
npx prisma migrate deploy`}
                            </code>
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </motion.section>

                  {/* API */}
                  <motion.section id="api" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">API</h2>
                      <Button variant="ghost" size="sm" onClick={() => toggleSection("api")}>
                        {expandedSections.api ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {expandedSections.api && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-4"
                      >
                        <p>
                          StageDirect utilise les API Routes de Next.js pour créer des endpoints RESTful qui
                          interagissent avec la base de données via Prisma.
                        </p>

                        <h3 className="text-xl font-semibold mt-8" id="api-structure">
                          Structure des API
                        </h3>
                        <p className="mt-2">
                          Les API sont organisées par fonctionnalité dans le dossier <code>app/api/</code>. Chaque
                          endpoint est implémenté dans un fichier <code>route.ts</code> à l'intérieur d'un dossier
                          correspondant à sa fonctionnalité.
                        </p>

                        <div className="mt-4 space-y-4">
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold">Authentification</h4>
                            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                              <li>
                                <code>/api/auth/login</code> - Connexion utilisateur
                              </li>
                              <li>
                                <code>/api/auth/me</code> - Récupération des informations de l'utilisateur connecté
                              </li>
                              <li>
                                <code>/api/logout</code> - Déconnexion utilisateur
                              </li>
                            </ul>
                          </div>
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold">Gestion des utilisateurs</h4>
                            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                              <li>
                                <code>/api/utilisateurs</code> - Création d'utilisateurs
                              </li>
                              <li>
                                <code>/api/admin</code> - Gestion des utilisateurs (admin)
                              </li>
                            </ul>
                          </div>
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold">Gestion des entreprises</h4>
                            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                              <li>
                                <code>/api/entreprises</code> - Liste des entreprises validées
                              </li>
                              <li>
                                <code>/api/valider_entreprises</code> - Validation des entreprises
                              </li>
                              <li>
                                <code>/api/dupli</code> - Détection des doublons
                              </li>
                              <li>
                                <code>/api/merge-entreprise</code> - Fusion d'entreprises
                              </li>
                            </ul>
                          </div>
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold">Gestion des contacts</h4>
                            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                              <li>
                                <code>/api/contact</code> - Liste des contacts
                              </li>
                              <li>
                                <code>/api/merge-contacts</code> - Fusion de contacts
                              </li>
                            </ul>
                          </div>
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold">Gestion des stages</h4>
                            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                              <li>
                                <code>/api/stages</code> - CRUD pour les stages
                              </li>
                            </ul>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-8" id="api-example">
                          Exemple d'implémentation d'API
                        </h3>
                        <p className="mt-2">
                          Voici un exemple d'implémentation d'une API Route pour la gestion des entreprises :
                        </p>

                        <div className="mt-4 bg-muted/30 p-4 rounded-lg relative">
                          <button
                            className="absolute top-2 right-2 p-1 rounded-md hover:bg-muted"
                            onClick={() => copyToClipboard(apiExample, "api-example")}
                          >
                            {copiedCode === "api-example" ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                          <pre className="text-sm overflow-auto">
                            <code>{apiExample}</code>
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </motion.section>

                  {/* Components */}
                  <motion.section id="components" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Composants</h2>
                      <Button variant="ghost" size="sm" onClick={() => toggleSection("components")}>
                        {expandedSections.components ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {expandedSections.components && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-4"
                      >
                        <p>
                          StageDirect utilise une architecture basée sur les composants React, avec un mélange de
                          composants client et serveur. Les composants sont organisés de manière modulaire pour
                          faciliter la réutilisation et la maintenance.
                        </p>

                        <h3 className="text-xl font-semibold mt-8" id="components-ui">
                          Composants UI
                        </h3>
                        <p className="mt-2">
                          L'application utilise la bibliothèque shadcn/ui pour les composants d'interface utilisateur de
                          base. Ces composants sont personnalisés avec Tailwind CSS pour correspondre à la charte
                          graphique de StageDirect.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <Card>
                            <CardContent className="pt-6">
                              <h4 className="font-semibold mb-2">Composants de base</h4>
                              <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li>Button</li>
                                <li>Input</li>
                                <li>Card</li>
                                <li>Select</li>
                                <li>Tabs</li>
                                <li>Badge</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <h4 className="font-semibold mb-2">Composants personnalisés</h4>
                              <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li>UserTable</li>
                                <li>KanbanBoard</li>
                                <li>Logo</li>
                                <li>UserMenu</li>
                                <li>ThemeToggle</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>

                        <h3 className="text-xl font-semibold mt-8" id="components-example">
                          Exemple de composant
                        </h3>
                        <p className="mt-2">Voici un exemple de composant personnalisé utilisé dans l'application :</p>

                        <div className="mt-4 bg-muted/30 p-4 rounded-lg relative">
                          <button
                            className="absolute top-2 right-2 p-1 rounded-md hover:bg-muted"
                            onClick={() => copyToClipboard(componentExample, "component-example")}
                          >
                            {copiedCode === "component-example" ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                          <pre className="text-sm overflow-auto">
                            <code>{componentExample}</code>
                          </pre>
                        </div>

                        <h3 className="text-xl font-semibold mt-8" id="components-pages">
                          Pages et layouts
                        </h3>
                        <p className="mt-2">
                          StageDirect utilise l'App Router de Next.js pour organiser les pages et les layouts. Chaque
                          page est définie dans un fichier <code>page.tsx</code> à l'intérieur d'un dossier
                          correspondant à son URL.
                        </p>

                        <div className="mt-4 space-y-2">
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold">Structure des pages</h4>
                            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                              <li>
                                <code>app/page.tsx</code> - Page d'accueil
                              </li>
                              <li>
                                <code>app/connexion/page.tsx</code> - Page de connexion
                              </li>
                              <li>
                                <code>app/inscription/page.tsx</code> - Page d'inscription
                              </li>
                              <li>
                                <code>app/admin/page.tsx</code> - Page d'administration
                              </li>
                              <li>
                                <code>app/entreprises/page.tsx</code> - Gestion des entreprises
                              </li>
                              <li>
                                <code>app/contact/page.tsx</code> - Gestion des contacts
                              </li>
                              <li>
                                <code>app/stages/page.tsx</code> - Gestion des stages
                              </li>
                              <li>
                                <code>app/kanban/page.tsx</code> - Tableau Kanban
                              </li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.section>

                  {/* Authentication */}
                  <motion.section id="authentication" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Authentification</h2>
                      <Button variant="ghost" size="sm" onClick={() => toggleSection("authentication")}>
                        {expandedSections.authentication ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {expandedSections.authentication && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-4"
                      >
                        <p>
                          StageDirect utilise un système d'authentification basé sur les cookies pour gérer les sessions
                          utilisateur. L'authentification est gérée par les API Routes et le middleware Next.js.
                        </p>

                        <h3 className="text-xl font-semibold mt-8" id="authentication-flow">
                          Flux d'authentification
                        </h3>
                        <ol className="list-decimal pl-6 space-y-2 mt-4">
                          <li>L'utilisateur soumet ses identifiants via le formulaire de connexion</li>
                          <li>
                            Les identifiants sont envoyés à l'API <code>/api/auth/login</code>
                          </li>
                          <li>L'API vérifie les identifiants dans la base de données</li>
                          <li>
                            Si les identifiants sont valides, l'API crée un cookie contenant l'email de l'utilisateur
                          </li>
                          <li>Le cookie est stocké dans le navigateur de l'utilisateur</li>
                          <li>
                            Pour les requêtes ultérieures, le middleware vérifie la présence et la validité du cookie
                          </li>
                          <li>Si le cookie est valide, l'utilisateur est considéré comme authentifié</li>
                        </ol>

                        <h3 className="text-xl font-semibold mt-8" id="authentication-middleware">
                          Middleware d'authentification
                        </h3>
                        <p className="mt-2">
                          Le middleware d'authentification vérifie si l'utilisateur est connecté et a les permissions
                          nécessaires pour accéder à certaines pages.
                        </p>

                        <div className="mt-4 bg-muted/30 p-4 rounded-lg relative">
                          <button
                            className="absolute top-2 right-2 p-1 rounded-md hover:bg-muted"
                            onClick={() => copyToClipboard(middlewareExample, "middleware-example")}
                          >
                            {copiedCode === "middleware-example" ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                          <pre className="text-sm overflow-auto">
                            <code>{middlewareExample}</code>
                          </pre>
                        </div>

                        <h3 className="text-xl font-semibold mt-8" id="authentication-roles">
                          Gestion des rôles
                        </h3>
                        <p className="mt-2">
                          StageDirect utilise un système de rôles pour contrôler l'accès aux différentes fonctionnalités
                          de l'application. Les rôles sont définis dans le modèle <code>Utilisateur</code> et sont
                          vérifiés par le middleware.
                        </p>

                        <div className="mt-4 space-y-2">
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold">Rôles disponibles</h4>
                            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                              <li>
                                <code>USER</code> - Utilisateur standard (étudiant)
                              </li>
                              <li>
                                <code>PROFESSEUR</code> - Enseignant
                              </li>
                              <li>
                                <code>ADMIN</code> - Administrateur
                              </li>
                              <li>
                                <code>SUPERADMIN</code> - Super administrateur
                              </li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.section>

                  {/* Deployment */}
                  <motion.section id="deployment" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Déploiement</h2>
                      <Button variant="ghost" size="sm" onClick={() => toggleSection("deployment")}>
                        {expandedSections.deployment ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {expandedSections.deployment && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-4"
                      >
                        <p>
                          StageDirect peut être déployé sur diverses plateformes, mais Vercel est recommandé pour sa
                          simplicité et son intégration native avec Next.js.
                        </p>

                        <h3 className="text-xl font-semibold mt-8" id="deployment-vercel">
                          Déploiement sur Vercel
                        </h3>
                        <ol className="list-decimal pl-6 space-y-2 mt-4">
                          <li>Créez un compte sur Vercel et connectez-le à votre dépôt Git</li>
                          <li>Importez le projet depuis votre dépôt</li>
                          <li>Configurez les variables d'environnement nécessaires</li>
                          <li>Déployez l'application</li>
                        </ol>

                        <h3 className="text-xl font-semibold mt-8" id="deployment-env">
                          Variables d'environnement
                        </h3>
                        <p className="mt-2">
                          Les variables d'environnement suivantes doivent être configurées pour le déploiement :
                        </p>

                        <div className="mt-4 bg-muted/30 p-4 rounded-lg">
                          <pre className="text-sm overflow-auto">
                            <code>
                              {`# Base de données
DATABASE_URL="mysql://user:password@host:port/database"

# Authentification
JWT_SECRET="votre_secret_jwt"
NEXTAUTH_URL="https://votre-domaine.com"

# Environnement
NODE_ENV="production"
`}
                            </code>
                          </pre>
                        </div>

                        <h3 className="text-xl font-semibold mt-8" id="deployment-database">
                          Configuration de la base de données
                        </h3>
                        <p className="mt-2">Pour déployer la base de données en production :</p>

                        <ol className="list-decimal pl-6 space-y-2 mt-4">
                          <li>Créez une base de données MySQL sur votre hébergeur préféré</li>
                          <li>
                            Configurez la variable d'environnement <code>DATABASE_URL</code> avec les informations de
                            connexion
                          </li>
                          <li>Exécutez les migrations Prisma pour initialiser la base de données :</li>
                        </ol>

                        <div className="mt-4 bg-muted/30 p-4 rounded-lg">
                          <pre className="text-sm overflow-auto">
                            <code>{`npx prisma migrate deploy`}</code>
                          </pre>
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
  { id: "architecture", label: "Architecture" },
  { id: "architecture-stack", label: "Stack technologique" },
  { id: "architecture-flow", label: "Flux de données" },
  { id: "database", label: "Base de données" },
  { id: "database-schema", label: "Schéma" },
  { id: "database-relations", label: "Relations" },
  { id: "database-migrations", label: "Migrations" },
  { id: "api", label: "API" },
  { id: "api-structure", label: "Structure" },
  { id: "api-example", label: "Exemple" },
  { id: "components", label: "Composants" },
  { id: "components-ui", label: "Composants UI" },
  { id: "components-example", label: "Exemple" },
  { id: "authentication", label: "Authentification" },
  { id: "authentication-flow", label: "Flux" },
  { id: "authentication-middleware", label: "Middleware" },
  { id: "deployment", label: "Déploiement" },
  { id: "deployment-vercel", label: "Vercel" },
  { id: "deployment-env", label: "Variables d'environnement" },
]

// Sections content for search functionality
const sections = [
  {
    id: "architecture",
    title: "Architecture",
    content:
      "StageDirect est construit sur une architecture moderne basée sur Next.js, utilisant l'App Router pour une navigation fluide et des performances optimales.",
  },
  {
    id: "architecture-stack",
    title: "Stack technologique",
    content:
      "Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion. Backend: Next.js API Routes, Prisma ORM, TypeScript, Middleware, Cookies pour l'authentification. Base de données: MySQL, Prisma comme ORM, Migrations automatisées.",
  },
  {
    id: "database",
    title: "Base de données",
    content:
      "StageDirect utilise MySQL comme système de gestion de base de données relationnelle, avec Prisma comme ORM (Object-Relational Mapping) pour simplifier les interactions avec la base de données.",
  },
  {
    id: "api",
    title: "API",
    content:
      "StageDirect utilise les API Routes de Next.js pour créer des endpoints RESTful qui interagissent avec la base de données via Prisma.",
  },
  {
    id: "components",
    title: "Composants",
    content:
      "StageDirect utilise une architecture basée sur les composants React, avec un mélange de composants client et serveur. Les composants sont organisés de manière modulaire pour faciliter la réutilisation et la maintenance.",
  },
  {
    id: "authentication",
    title: "Authentification",
    content:
      "StageDirect utilise un système d'authentification basé sur les cookies pour gérer les sessions utilisateur. L'authentification est gérée par les API Routes et le middleware Next.js.",
  },
  {
    id: "deployment",
    title: "Déploiement",
    content:
      "StageDirect peut être déployé sur diverses plateformes, mais Vercel est recommandé pour sa simplicité et son intégration native avec Next.js.",
  },
]

// Code examples
const prismaSchema = `// Extrait du schéma Prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  PROFESSEUR
  ADMIN
  SUPERADMIN
}

model Utilisateur {
  id            Int      @id @default(autoincrement())
  email         String   @unique
  nom           String
  prenom        String
  password      String
  etablissement String
  niveau        String?
  role          Role     @default(USER)
  avatar        String?
  createdAt     DateTime @default(now())
}

model Entreprise {
  id_entreprise     Int      @id @default(autoincrement())
  nom_entreprise    String
  rue_entreprise    String?
  cp_entreprise     String?
  ville_entreprise  String
  pays_entreprise   String   @default("France")
  service_entreprise String?
  tel_entreprise    String?
  fax_entreprise    String?
  email_entreprise  String?
  taille_entreprise String?
  fk_id_activite    Int
  fk_id_contact     Int?
  valider           Boolean  @default(false)
  secteur           Secteur_activite @relation(fields: [fk_id_activite], references: [id_activite])
  contact           Contact? @relation(fields: [fk_id_contact], references: [id_contact])
  stages            Stage[]
}

model Contact {
  id_contact    Int         @id @default(autoincrement())
  nom_contact   String
  tel_contact   String?
  email_contact String?
  entreprises   Entreprise[]
  stages        Stage[]
}

model Secteur_activite {
  id_activite      Int         @id @default(autoincrement())
  libelle_activite String
  entreprises      Entreprise[]
}

model Stage {
  id          Int       @id @default(autoincrement())
  intitulé    String
  date        DateTime
  entrepriseId Int
  contactId   Int
  entreprise  Entreprise @relation(fields: [entrepriseId], references: [id_entreprise])
  contact     Contact    @relation(fields: [contactId], references: [id_contact])
}`

const apiExample = `// api/entreprises/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const entreprises = await prisma.entreprise.findMany({
      where: { valider: true }, // Filtre uniquement les entreprises validées
    });

    return NextResponse.json(entreprises);
  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises:", error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des entreprises' },
      { status: 500 }
    );
  }
}`

const componentExample = `// admin/user-table.tsx
"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: number
  nom: string
  prenom: string
  email: string
  etablissement: string
  niveau: string
  createdAt: string
  role: string
}

interface UserTableProps {
  users: User[]
  onUpdateRole: (id: number, role: string) => void
}

export function UserTable({ users, onUpdateRole }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof User>("nom")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Logique de tri et de filtrage
  const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return (
    <div className="space-y-4">
      {/* Interface de recherche et de tri */}
      <input
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {/* Tableau des utilisateurs */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.nom}</TableCell>
              <TableCell>{user.prenom}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select defaultValue={user.role} onValueChange={(role) => onUpdateRole(user.id, role)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">Utilisateur</SelectItem>
                    <SelectItem value="PROFESSEUR">Professeur</SelectItem>
                    <SelectItem value="ADMIN">Administrateur</SelectItem>
                    <SelectItem value="SUPERADMIN">Super Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}`

const middlewareExample = `// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Chercher le token dans les cookies
  const token = req.cookies.get("token");

  // Si le token est absent, rediriger vers /unauthorized
  if (!token) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décoder le token JWT
    // Vérifier si le rôle de l'utilisateur est SUPERADMIN
    if (decodedToken.role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    
    // Si le rôle est SUPERADMIN, continuer avec la requête
    return NextResponse.next();
  } catch (err) {
    console.error("Erreur de décodage du token :", err);
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
}

// Appliquer ce middleware uniquement sur les pages d'administration
export const config = {
  matcher: ["/admin/*"],
};`

