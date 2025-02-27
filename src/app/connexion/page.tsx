"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, ArrowLeft } from "lucide-react"

export default function EtudiantPage() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)

  return (
    <div className="container mx-auto py-10">
      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'accueil
      </Link>
      <div className="max-w-md mx-auto text-center">
        <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Espace Étudiants</h1>
        <p className="text-muted-foreground mb-8">
          Connectez-vous ou inscrivez-vous pour accéder à nos offres de stages et gérer vos candidatures.
        </p>
        <div className="space-y-4">
          <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Se connecter</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connexion Étudiant</DialogTitle>
                <DialogDescription>Entrez vos identifiants pour accéder à votre compte.</DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.edu" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </form>
              <DialogFooter className="sm:justify-start">
                <DialogTrigger asChild>
                  <Button type="button" variant="link">
                    Mot de passe oublié ?
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                S'inscrire
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Inscription Étudiant</DialogTitle>
                <DialogDescription>Créez votre compte pour accéder à nos services de stage.</DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input id="nom" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input id="prenom" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email académique</Label>
                  <Input id="email" type="email" placeholder="votre@email.edu" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="etablissement">Établissement</Label>
                  <Select>
                    <SelectTrigger id="etablissement">
                      <SelectValue placeholder="Sélectionnez votre établissement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="univ-paris">Université de Paris</SelectItem>
                      <SelectItem value="sorbonne">Sorbonne Université</SelectItem>
                      <SelectItem value="polytechnique">École Polytechnique</SelectItem>
                      <SelectItem value="centrale">CentraleSupélec</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="niveau">Niveau d'études</Label>
                  <Select>
                    <SelectTrigger id="niveau">
                      <SelectValue placeholder="Sélectionnez votre niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="l1">Licence 1</SelectItem>
                      <SelectItem value="l2">Licence 2</SelectItem>
                      <SelectItem value="l3">Licence 3</SelectItem>
                      <SelectItem value="m1">Master 1</SelectItem>
                      <SelectItem value="m2">Master 2</SelectItem>
                      <SelectItem value="doctorat">Doctorat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  S'inscrire
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

