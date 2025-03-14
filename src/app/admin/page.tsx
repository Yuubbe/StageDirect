"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"

interface Utilisateur {
  id: number
  nom: string
  prenom: string
  email: string
  etablissement: string
  niveau: string
  createdAt: string
  role: string
}

export default function AdminPage() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (!res.ok) throw new Error("Erreur d'authentification")
        
        const data = await res.json()
        if (!data.role || (data.role !== "ADMIN" && data.role !== "SUPERADMIN")) {
          toast.error("Accès non autorisé")
          router.push("/")
          return
        }

        // Si l'accès est autorisé, charger les utilisateurs
        const fetchUtilisateurs = async () => {
          try {
            const res = await fetch("/api/admin")
            if (!res.ok) throw new Error(`Erreur ${res.status}`)
            const data = await res.json()
            setUtilisateurs(data)
          } catch (_) {
            setError("Impossible de récupérer les utilisateurs.")
          } finally {
            setLoading(false)
          }
        }

        fetchUtilisateurs()
      } catch (_) {
        toast.error("Erreur lors de la vérification des droits")
        router.push("/")
      }
    }

    checkAccess()
  }, [router])

  const updateRole = async (id: number, newRole: string) => {
    try {
      const res = await fetch(`/api/admin`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role: newRole }),
      })
      if (!res.ok) throw new Error("Échec de la mise à jour")

      setUtilisateurs((prev) =>
        prev.map((user) => {
          if (user.id === id) {
            // Stocker le nouveau rôle dans le localStorage
            localStorage.setItem("userRole", newRole)
            return { ...user, role: newRole }
          }
          return user
        })
      )
      toast.success("Rôle mis à jour avec succès !")
    } catch (_) {
      console.error("Erreur lors de la mise à jour du rôle")
      toast.error("Erreur lors de la mise à jour")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Button variant="outline" onClick={() => router.push("/")} className="absolute top-5 left-5">
        ← Retour à l'accueil
      </Button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Gestion des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <p className="text-red-500 p-4 bg-red-50 rounded-md text-center">{error}</p>
            ) : utilisateurs.length === 0 ? (
              <p className="text-center text-muted-foreground">Aucun utilisateur trouvé.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <motion.table className="min-w-full table-auto border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-3 border">Nom</th>
                        <th className="px-4 py-3 border">Prénom</th>
                        <th className="px-4 py-3 border">Email</th>
                        <th className="px-4 py-3 border">Établissement</th>
                        <th className="px-4 py-3 border">Niveau</th>
                        <th className="px-4 py-3 border">Rôle</th>
                        <th className="px-4 py-3 border">Date de création</th>
                      </tr>
                    </thead>
                    <tbody>
                      {utilisateurs.map((user) => (
                        <motion.tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 border">{user.nom}</td>
                          <td className="px-4 py-3 border">{user.prenom}</td>
                          <td className="px-4 py-3 border">{user.email}</td>
                          <td className="px-4 py-3 border">{user.etablissement}</td>
                          <td className="px-4 py-3 border">{user.niveau}</td>
                          <td className="px-4 py-3 border">
                            <Select onValueChange={(value) => updateRole(user.id, value)} defaultValue={user.role}>
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Sélectionner un rôle" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USER">Utilisateur</SelectItem>
                                <SelectItem value="PROFESSEUR">Professeur</SelectItem>
                                <SelectItem value="ADMIN">Administrateur</SelectItem>
                                <SelectItem value="SUPERADMIN">Super Administrateur</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-4 py-3 border">{new Date(user.createdAt).toLocaleDateString()}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </motion.table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
