"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ChevronRight, Sun, Moon, User, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import Cookie from "js-cookie"
import { motion } from "framer-motion"
import Logo from "@/components/logo"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  email: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Récupérer l'email de l'utilisateur depuis le cookie
    const userEmail = Cookie.get("userEmail")
    if (userEmail) {
      setUser({ email: userEmail })
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    Cookie.remove("userEmail")
    setUser(null)
    window.location.reload()
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = ["Entreprises", "Admin", "Stages", "Kanban", "Contact", "Validation Entreprises"]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-background/50"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden md:flex gap-6">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium relative group"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Menu utilisateur</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profil" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <Link href="/connexion" className="text-sm font-medium relative group">
                    <span>Connexion</span>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button asChild className="relative overflow-hidden group">
                    <Link href="/inscription">
                      <span className="relative z-10">Essai gratuit</span>
                      <span className="absolute inset-0 bg-primary-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    </Link>
                  </Button>
                </motion.div>
              </>
            )}

            <Button variant="outline" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4 space-y-2 border-t">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center py-2 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex flex-col justify-center space-y-4" variants={itemVariants}>
                <div className="space-y-2">
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                    variants={itemVariants}
                  >
                    Simplifiez la gestion de vos stages
                  </motion.h1>
                  <motion.p className="max-w-[600px] text-muted-foreground md:text-xl" variants={itemVariants}>
                    Une plateforme complète pour connecter étudiants, entreprises et établissements d&apos;enseignement.
                  </motion.p>
                  <motion.div className="flex flex-col sm:flex-row gap-3 pt-6" variants={itemVariants}>
                    <Button asChild size="lg" className="group relative overflow-hidden">
                      <Link href="/inscription">
                        <span className="relative z-10 flex items-center">
                          Commencer maintenant
                          <motion.span
                            className="ml-2"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </motion.span>
                        </span>
                        <span className="absolute inset-0 bg-primary-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/presentation">En savoir plus</Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="hidden lg:flex items-center justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
              ></motion.div>
            </motion.div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-12 md:py-24 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">Pourquoi choisir StageDirect ?</h2>
              <p className="mt-4 text-muted-foreground">
                Notre plateforme offre des avantages uniques pour tous les acteurs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "Pour les étudiants",
                  description: "Trouvez facilement des stages correspondant à vos compétences et aspirations.",
                },
                {
                  title: "Pour les écoles",
                  description: "Suivez le parcours de vos étudiants et développez vos partenariats.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
                >
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-12 md:py-24 bg-background"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">Documentation complète</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Accédez à notre documentation détaillée pour tirer le meilleur parti de StageDirect, que vous soyez
                utilisateur ou développeur.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg border shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Documentation Utilisateur</h3>
                  <p className="text-muted-foreground mb-6">
                    Guide complet pour les étudiants, entreprises et établissements d'enseignement utilisant
                    StageDirect.
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/documentation/utilisateur">Consulter le guide utilisateur</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg border shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M18 16.98h-5.99c-1.66 0-3.01-1.34-3.01-3s1.34-3 3.01-3H18"></path>
                      <path d="M6 7.02h6c1.66 0 3 1.35 3 3.01 0 1.66-1.34 3-3 3H6"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Documentation Technique</h3>
                  <p className="text-muted-foreground mb-6">
                    Ressources techniques pour les développeurs et administrateurs travaillant avec StageDirect.
                  </p>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <Link href="/documentation/technique">Consulter la documentation technique</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
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

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative overflow-hidden"
      >
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 0 : 1,
            opacity: theme === "dark" ? 0 : 1,
            rotate: theme === "dark" ? -30 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute"
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 30,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute"
        >
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
        <span className="sr-only">Changer le thème</span>
      </Button>
    </motion.div>
  )
}