import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Building, ArrowLeft } from "lucide-react"

export default function EntrepriseInscription() {
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
          <form>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="nom">Nom de l'entreprise</Label>
                <Input id="nom" placeholder="Entrez le nom de votre entreprise" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="siret">Numéro SIRET (facultatif)</Label>
                <Input id="siret" placeholder="Entrez votre numéro SIRET" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="secteur">Secteur d'activité</Label>
                <Select>
                  <SelectTrigger id="secteur">
                    <SelectValue placeholder="Sélectionnez votre secteur d'activité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technologies de l'information</SelectItem>
                    <SelectItem value="finance">Finance et Assurance</SelectItem>
                    <SelectItem value="sante">Santé et Médical</SelectItem>
                    <SelectItem value="education">Éducation</SelectItem>
                    <SelectItem value="industrie">Industrie et Manufacturing</SelectItem>
                    <SelectItem value="commerce">Commerce et Distribution</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input id="adresse" placeholder="Adresse de l'entreprise" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code_postal">Code Postal</Label>
                <Input id="code_postal" placeholder="Code postal" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ville">Ville</Label>
                <Input id="ville" placeholder="Ville" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site_web">Site Web</Label>
                <Input id="site_web" type="url" placeholder="https://www.votreentreprise.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description de l'entreprise</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez brièvement votre entreprise, ses activités et sa culture"
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact_nom">Nom du contact principal</Label>
                <Input id="contact_nom" placeholder="Nom et prénom" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact_email">Email du contact principal</Label>
                <Input id="contact_email" type="email" placeholder="email@entreprise.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact_telephone">Téléphone du contact principal</Label>
                <Input id="contact_telephone" type="tel" placeholder="+33 1 23 45 67 89" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Annuler</Button>
          <Button>S'inscrire</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

