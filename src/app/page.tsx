import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle,
  Briefcase,
  GraduationCap,
  Building,
  Users,
  Calendar,
  FileText,
  ChevronRight,
  Menu,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StageDirect</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#fonctionnalites" className="text-sm font-medium hover:text-primary">
              Fonctionnalités
            </Link>
            <Link href="#comment-ca-marche" className="text-sm font-medium hover:text-primary">
              Comment ça marche
            </Link>
            <Link href="#tarifs" className="text-sm font-medium hover:text-primary">
              Tarifs
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary">
              FAQ
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-sm font-medium hover:underline underline-offset-4">
              Connexion
            </Link>
            <Button asChild>
              <Link href="/register">Essai gratuit</Link>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Simplifiez la gestion de vos stages
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Une plateforme complète pour connecter étudiants, entreprises et établissements d'enseignement.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/register">Commencer gratuitement</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/demo">
                      Voir la démo
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Aucune carte de crédit requise</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Interface de StageManager"
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="fonctionnalites" className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Fonctionnalités principales
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tout ce dont vous avez besoin pour gérer efficacement vos stages
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card>
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Pour les étudiants</CardTitle>
                  <CardDescription>Trouvez et postulez facilement aux offres de stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Recherche avancée d'offres</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Suivi des candidatures</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Dépôt de rapports de stage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Évaluations et feedback</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Building className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Pour les entreprises</CardTitle>
                  <CardDescription>Publiez des offres et gérez vos stagiaires efficacement</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Publication d'offres</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Gestion des candidatures</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Suivi des stagiaires</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Évaluation des compétences</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Pour les établissements</CardTitle>
                  <CardDescription>Supervisez et validez les stages de vos étudiants</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Validation des conventions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Suivi pédagogique</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Statistiques et rapports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Gestion des tuteurs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="comment-ca-marche" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comment ça marche</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Un processus simple et efficace pour tous les acteurs
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">1. Planification</h3>
                  <p className="text-muted-foreground">
                    Les établissements définissent les périodes de stage et les entreprises publient leurs offres.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">2. Candidature</h3>
                  <p className="text-muted-foreground">
                    Les étudiants recherchent et postulent aux offres qui correspondent à leur profil.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">3. Suivi</h3>
                  <p className="text-muted-foreground">
                    Tous les acteurs suivent l'évolution du stage et échangent via la plateforme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

       

        <section id="temoignages" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ils nous font confiance</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez ce que nos utilisateurs disent de StageManager
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      width={60}
                      height={60}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground italic">
                        "StageManager a complètement transformé notre processus de recrutement de stagiaires. Nous
                        gagnons un temps précieux et trouvons des profils plus pertinents."
                      </p>
                      <p className="mt-2 font-semibold">Sophie Martin</p>
                      <p className="text-sm text-muted-foreground">DRH, Entreprise Tech</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      width={60}
                      height={60}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground italic">
                        "En tant qu'étudiant, j'ai pu trouver mon stage idéal en quelques clics. Le suivi pendant toute
                        la durée du stage était vraiment pratique."
                      </p>
                      <p className="mt-2 font-semibold">Thomas Dubois</p>
                      <p className="text-sm text-muted-foreground">Étudiant en informatique</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      width={60}
                      height={60}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground italic">
                        "Notre université utilise StageManager depuis 2 ans et nous avons constaté une amélioration
                        significative dans la gestion administrative des stages."
                      </p>
                      <p className="mt-2 font-semibold">Pierre Leroy</p>
                      <p className="text-sm text-muted-foreground">Directeur des études, Université</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Questions fréquentes</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tout ce que vous devez savoir sur StageManager
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 md:gap-8 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Comment puis-je m'inscrire en tant qu'étudiant ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    L'inscription est gratuite pour les étudiants. Il vous suffit de cliquer sur "S'inscrire" et de
                    suivre les étapes. Vous devrez valider votre adresse email académique pour finaliser votre
                    inscription.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Les entreprises peuvent-elles publier des offres gratuitement ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Nous proposons un essai gratuit de 30 jours pour les entreprises. Après cette période, un abonnement
                    est nécessaire pour continuer à publier des offres et gérer vos stagiaires.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Comment les établissements peuvent-ils intégrer StageManager ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Nous proposons des solutions sur mesure pour les établissements d'enseignement. Contactez notre
                    équipe commerciale pour discuter de vos besoins spécifiques et obtenir une démonstration
                    personnalisée.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Est-il possible d'exporter les données et rapports ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Oui, toutes nos formules permettent d'exporter les données et rapports dans différents formats (PDF,
                    Excel, CSV). Les administrateurs peuvent également configurer des rapports automatiques.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Prêt à simplifier la gestion de vos stages ?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Contactez-nous pour en savoir plus ou commencez votre essai gratuit dès aujourd'hui.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/register">Commencer gratuitement</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  width={500}
                  height={400}
                  alt="Contact"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StageManager. Tous droits réservés.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="text-sm text-muted-foreground hover:underline">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="text-sm text-muted-foreground hover:underline">
              Politique de confidentialité
            </Link>
            <Link href="/cgv" className="text-sm text-muted-foreground hover:underline">
              CGV
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

