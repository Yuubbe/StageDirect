"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building, ArrowLeft } from "lucide-react";

interface Secteur {
  id_activite: number;
  nom_activite: string;
}

interface Contact {
  id_contact: number;
  nom_contact: string;
}

export default function EntrepriseInscription() {
  const [formData, setFormData] = useState({
    nom_entreprise: "",
    rue_entreprise: "",
    cp_entreprise: "",
    ville_entreprise: "",
    pays_entreprise: "France", // Valeur par défaut
    service_entreprise: "",
    tel_entreprise: "",
    fax_entreprise: "",
    email_entreprise: "",
    taille_entreprise: "",
    fk_id_activite: "", // Valeur à définir
    fk_id_contact: "",  // Valeur à définir
    valider: false,      // Valeur par défaut
  });

  const [secteurs, setSecteurs] = useState<Secteur[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const secteurRes = await fetch("/api/secteurs");
        const secteurData = await secteurRes.json();
        setSecteurs(secteurData);

        const contactRes = await fetch("/api/contacts");
        const contactData = await contactRes.json();
        setContacts(contactData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/entreprises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          valider: 1, // Mettre à 1 pour valider l'entreprise
        }),
      });

      console.log("Statut HTTP :", res.status);
      const data = await res.json().catch(() => null);
      console.log("Réponse JSON :", data);

      if (res.ok) {
        router.push("/");
      } else {
        console.error("Erreur lors de l'inscription");
        alert("Échec de l'inscription. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'accueil
      </Link>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            <CardTitle>Inscription Entreprise</CardTitle>
          </div>
          <CardDescription>Renseignez les informations de votre entreprise pour rejoindre StageManager</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="nom_entreprise">Nom de l'entreprise</Label>
                <Input id="nom_entreprise" placeholder="Entrez le nom de votre entreprise" value={formData.nom_entreprise} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rue_entreprise">Adresse</Label>
                <Input id="rue_entreprise" placeholder="Adresse de l'entreprise" value={formData.rue_entreprise} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cp_entreprise">Code Postal</Label>
                <Input id="cp_entreprise" placeholder="Code postal" value={formData.cp_entreprise} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ville_entreprise">Ville</Label>
                <Input id="ville_entreprise" placeholder="Ville" value={formData.ville_entreprise} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pays_entreprise">Pays</Label>
                <Input id="pays_entreprise" placeholder="Pays de l'entreprise" value={formData.pays_entreprise} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service_entreprise">Service de l'entreprise</Label>
                <Input id="service_entreprise" placeholder="Service de l'entreprise" value={formData.service_entreprise} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tel_entreprise">Téléphone</Label>
                <Input id="tel_entreprise" type="tel" placeholder="Numéro de téléphone" value={formData.tel_entreprise} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fax_entreprise">Fax (facultatif)</Label>
                <Input id="fax_entreprise" placeholder="Numéro de fax" value={formData.fax_entreprise} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email_entreprise">Email</Label>
                <Input id="email_entreprise" type="email" placeholder="Email de l'entreprise" value={formData.email_entreprise} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="taille_entreprise">Taille de l'entreprise</Label>
                <Input id="taille_entreprise" placeholder="Taille de l'entreprise" value={formData.taille_entreprise} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fk_id_activite">Secteur d'activité</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, fk_id_activite: value }))} value={formData.fk_id_activite}>
                  <SelectTrigger id="fk_id_activite">
                    <SelectValue placeholder="Sélectionnez votre secteur d'activité" />
                  </SelectTrigger>
                  <SelectContent>
                    {secteurs.map((secteur) => (
                      <SelectItem key={secteur.id_activite} value={secteur.id_activite.toString()}>
                        {secteur.nom_activite}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fk_id_contact">Contact principal</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, fk_id_contact: value }))} value={formData.fk_id_contact}>
                  <SelectTrigger id="fk_id_contact">
                    <SelectValue placeholder="Sélectionnez le contact principal" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id_contact} value={contact.id_contact.toString()}>
                        {contact.nom_contact}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/")}>Annuler</Button>
                <Button type="submit">S'inscrire</Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
