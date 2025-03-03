"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default function EtudiantPage() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [etablissement, setEtablissement] = useState("");
  const [niveau, setNiveau] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    const res = await fetch("/api/etudiants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom, email, password, etablissement, niveau }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(`❌ Erreur : ${data.error}`);
      return;
    }

    setMessage("✅ Inscription réussie !");
    setNom("");
    setPrenom("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEtablissement("");
    setNiveau("");
  };

  return (
    <div className="container mx-auto py-10">
      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'accueil
      </Link>
      <div className="max-w-md mx-auto text-center">
        <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Espace Étudiants</h1>
        <p className="text-muted-foreground mb-8">Inscrivez-vous pour accéder aux offres de stages.</p>

        <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">S'inscrire</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Inscription Étudiant</DialogTitle>
              <DialogDescription>Créez votre compte étudiant.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email académique</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="etablissement">Établissement</Label>
                <Select onValueChange={setEtablissement}>
                  <SelectTrigger>
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
                <Select onValueChange={setNiveau}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="l1">Licence 1</SelectItem>
                    <SelectItem value="m1">Master 1</SelectItem>
                    <SelectItem value="doctorat">Doctorat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">S'inscrire</Button>
            </form>
            {message && <p className="text-center mt-2">{message}</p>}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}