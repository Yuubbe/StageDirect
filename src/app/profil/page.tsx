"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import Cookie from "js-cookie"
import { motion } from "framer-motion"
import { User, Mail, Building, Edit, Save, X, ChevronLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Logo from "@/components/logo"

interface UserProfile {
  email: string
  nom: string
  prenom: string
  etablissement: string
  poste?: string
  role: "USER" | "PROFESSEUR" | "ADMIN" | "SUPERADMIN" // Adjust roles as per your application
  createdAt: string
}

export default function Profil() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const userEmail = Cookie.get("userEmail")
    if (userEmail) {
      fetch(`/api/users/profile`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setUser(data)
          setFormData(data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du profil:", error)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser)
        setIsEditing(false)
      } else {
        console.error("Erreur lors de la mise à jour du profil")
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const cancelEdit = () => {
    setFormData(user)
    setIsEditing(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Accès non autorisé</CardTitle>
            <CardDescription className="text-center">
              Veuillez vous connecter pour accéder à votre profil
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/connexion">Se connecter</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 w-full border-b backdrop-blur bg-background/80 shadow-sm"
      >
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </motion.header>

      <main className="flex-1 container py-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <Avatar className="h-20 w-20 border-4 border-background shadow-xl">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt={`${user.prenom} ${user.nom}`} />
              <AvatarFallback className="text-xl">
                {user.prenom?.[0]}
                {user.nom?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">
                {user.prenom} {user.nom}
              </h1>
              <p className="text-muted-foreground">
                {user.role} • Inscrit depuis le {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </motion.div>

          <Tabs defaultValue="informations" className="w-full">
            <motion.div variants={itemVariants}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="informations">Informations personnelles</TabsTrigger>
                <TabsTrigger value="securite">Sécurité</TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="informations">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Informations personnelles</CardTitle>
                      <CardDescription>Gérez vos informations personnelles et de contact</CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={cancelEdit} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Annuler
                        </Button>
                        <Button onClick={handleSubmit} size="sm" disabled={isLoading}>
                          {isLoading ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Enregistrement...
                            </span>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Enregistrer
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="prenom">Prénom</Label>
                          <Input
                            id="prenom"
                            name="prenom"
                            value={formData?.prenom || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="transition-all duration-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nom">Nom</Label>
                          <Input
                            id="nom"
                            name="nom"
                            value={formData?.nom || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            value={formData?.email || ""}
                            onChange={handleInputChange}
                            disabled={true}
                            className="transition-all duration-200"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="etablissement">Établissement</Label>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="etablissement"
                            name="etablissement"
                            value={formData?.etablissement || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Rôle</Label>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <Select
                            disabled={!isEditing}
                            value={formData?.role}
                            onValueChange={(value) => handleSelectChange(value, "role")}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un rôle" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USER">Utilisateur</SelectItem>
                              <SelectItem value="PROFESSEUR">Professeur</SelectItem>
                              <SelectItem value="ADMIN">Administrateur</SelectItem>
                              <SelectItem value="SUPERADMIN">Super Administrateur</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="securite">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité du compte</CardTitle>
                    <CardDescription>Gérez les paramètres de sécurité de votre compte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">Mot de passe</h3>
                            <p className="text-sm text-muted-foreground">Dernière modification il y a 3 mois</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">Email de récupération</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo className="w-24 h-6" />
            <span className="text-sm font-medium">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/documentation/utilisateur" className="hover:text-foreground transition-colors">
              Documentation
            </Link>
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

