"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"
import confetti from "canvas-confetti"
import { useRouter } from "next/navigation";

const FormulaireUtilisateur = () => {
  // États pour chaque champ du formulaire
  const router = useRouter() // Initialisation du router
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [etablissement, setEtablissement] = useState("")
  const [niveau, setNiveau] = useState("")
  const [role, setRole] = useState("USER") // Valeur par défaut "USER"
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

  // Animation variants
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

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setIsSuccess(false)
    setIsError(false)

    const utilisateurData = { nom, prenom, email, password, etablissement, niveau, role };

    try {
      const res = await fetch("/api/utilisateurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(utilisateurData),
      });

      if (res.ok) {
        setIsSuccess(true);
        setMessage("Utilisateur créé avec succès !");
        setShowSuccessAnimation(true);

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        setTimeout(() => {
          setShowSuccessAnimation(false);
        }, 4000);

        // Réinitialiser les champs
        setNom("");
        setPrenom("");
        setEmail("");
        setPassword("");
        setEtablissement("");
        setNiveau("");
        setRole("USER");

        // Rediriger vers /connexion après 2 secondes
        setTimeout(() => {
          router.push("/connexion");
        }, 2000);
      } else {
        const errorData = await res.json();
        setIsError(true);
        setMessage(`Erreur : ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-b from-background to-secondary/20">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              >
                Créer un utilisateur
              </motion.div>
            </CardTitle>
            <CardDescription className="text-center">
              Remplissez le formulaire pour créer un nouvel utilisateur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.form
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="nom" className="text-sm font-medium">
                  Nom
                </Label>
                <Input
                  id="nom"
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                  placeholder="Entrez votre nom"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="prenom" className="text-sm font-medium">
                  Prénom
                </Label>
                <Input
                  id="prenom"
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                  placeholder="Entrez votre prénom"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                  placeholder="exemple@email.com"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="etablissement" className="text-sm font-medium">
                  Établissement
                </Label>
                <Input
                  id="etablissement"
                  type="text"
                  value={etablissement}
                  onChange={(e) => setEtablissement(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                  placeholder="Nom de l'établissement"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="niveau" className="text-sm font-medium">
                  Niveau
                </Label>
                <Input
                  id="niveau"
                  type="text"
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                  placeholder="Niveau d'études"
                />
              </motion.div>
{/*
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Rôle
                </Label>
                
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/50">
                    <SelectValue placeholder="Sélectionnez un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">Utilisateur</SelectItem>
                    <SelectItem value="ADMIN">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              

              </motion.div>
*/}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    "Enregistrer l'utilisateur"
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </CardContent>
          <CardFooter className="flex flex-col">
            {message && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                <Alert
                  className={cn(
                    "mb-2",
                    isSuccess ? "bg-green-50 text-green-800 border-green-200" : "",
                    isError ? "bg-destructive/10 text-destructive border-destructive/20" : "",
                  )}
                >
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </CardFooter>
        </Card>
      </motion.div>
      {showSuccessAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
              },
            }}
            className="bg-card p-8 rounded-lg shadow-lg flex flex-col items-center max-w-md w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                transition: {
                  times: [0, 0.6, 1],
                  duration: 0.8,
                },
              }}
              className="text-green-500 mb-4"
            >
              <CheckCircle2 size={80} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.3 },
              }}
              className="text-2xl font-bold text-center mb-2"
            >
              Inscription réussie !
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.5 },
              }}
              className="text-center text-muted-foreground mb-6"
            >
              L'utilisateur a été créé avec succès.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.7 },
              }}
            >
              <Button onClick={() => setShowSuccessAnimation(false)} className="px-6">
                Continuer
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default FormulaireUtilisateur

