"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase, Menu, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from "react-hook-form"

export default function Home() {
  const [user, setUser] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState("https://github.com/shadcn.png")

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchUser()
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fetch user data
  const fetchUser = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      const response = await fetch("/api/etudiants")
      const data = await response.json()
      if (data.length > 0) {
        setUser(data[0]) // Set user as first entry
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    window.location.reload()
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Profile Update Handler
  const onProfileSubmit = async (data) => {
    try {
      const response = await fetch(`/api/etudiants/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      })
      
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        alert('Profil mis à jour avec succès');
        setIsProfileOpen(false);
      } else {
        alert('Erreur lors de la mise à jour du profil');
      }
    } catch (error) {
      console.error('Erreur de mise à jour du profil :', error)
    }
  }

  // Password Update Handler
  const onPasswordSubmit = async (data) => {
    try {
      const response = await fetch(`/api/etudiants/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: data.newPassword,
        }),
      })
      
      if (response.ok) {
        alert('Mot de passe mis à jour avec succès')
        const updatedUser = await response.json()
        setUser(updatedUser)
        setIsProfileOpen(false)
      } else {
        alert('Erreur lors de la mise à jour du mot de passe')
      }
    } catch (error) {
      console.error('Erreur de mise à jour du mot de passe :', error)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300 ${
          isScrolled ? "bg-background/95 shadow-sm" : "bg-background"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StageDirect</span>
          </motion.div>

          <motion.nav className="hidden md:flex gap-6" initial="hidden" animate="visible" variants={staggerContainer}>
            {["Entreprises", "admin", "Stages", "Kanban", "Contact"].map((item, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Link
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium relative group"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {user ? (
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Avatar
                    className="cursor-pointer border-2 border-transparent hover:border-primary transition-all duration-300"
                    onClick={() => setIsProfileOpen(true)}
                  >
                    <AvatarImage src={avatarPreview} alt="Avatar" />
                    <AvatarFallback>
                      {user.nom && user.prenom ? `${user.nom[0]}${user.prenom[0]}` : "UN"}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <span className="text-sm font-medium">
                  Connecté en tant que {user.nom} {user.prenom}
                </span>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Déconnexion
                  </Button>
                </motion.div>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/connexion"
                  className="text-sm font-medium hover:text-primary transition-colors duration-300"
                >
                  Connexion
                </Link>
              </motion.div>
            )}

            {!user && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="relative overflow-hidden group">
                  <Link href="/inscription">
                    <span className="relative z-10">Essai gratuit</span>
                    <span className="absolute inset-0 bg-primary-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Link>
                </Button>
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      <main className="flex-1">
        <motion.section
          className="py-12 md:py-24 lg:py-32 xl:py-48"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <motion.div className="flex flex-col justify-center space-y-4" variants={fadeIn}>
                <div className="space-y-2">
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Simplifiez la gestion de vos stages
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Une plateforme complète pour connecter étudiants, entreprises et établissements d'enseignement.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Profile Edit Dialog */}
      <AnimatePresence>
        {isProfileOpen && (
          <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Modifier votre profil</DialogTitle>
                <DialogDescription>Mettez à jour votre photo de profil, email ou mot de passe.</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="password">Mot de passe</TabsTrigger>
                </TabsList>

                {/* Formulaire de mise à jour du profil */}
                <TabsContent value="profile" className="space-y-4 py-4">
                  <form onSubmit={handleSubmit(onProfileSubmit)}>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative group">
                        <Avatar className="h-24 w-24 border-2 border-primary">
                          <AvatarImage src={avatarPreview} alt="Avatar" />
                          <AvatarFallback>
                            {user?.nom && user?.prenom ? `${user.nom[0]}${user.prenom[0]}` : "UN"}
                          </AvatarFallback>
                        </Avatar>
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <div className="w-full space-y-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input
                          id="email"
                          placeholder="nouvel@email.com"
                          {...register("email", { required: true })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Button type="submit">Enregistrer</Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>

                {/* Formulaire de mise à jour du mot de passe */}
                <TabsContent value="password" className="space-y-4 py-4">
                  <form onSubmit={handleSubmit(onPasswordSubmit)}>
                    <div className="flex flex-col space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                        <Input
                          type="password"
                          id="currentPassword"
                          placeholder="********"
                          {...register("currentPassword", { required: true })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                        <Input
                          type="password"
                          id="newPassword"
                          placeholder="********"
                          {...register("newPassword", { required: true })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <Input
                          type="password"
                          id="confirmPassword"
                          placeholder="********"
                          {...register("confirmPassword", { required: true })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Button type="submit">Mettre à jour</Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsProfileOpen(false)}>
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
