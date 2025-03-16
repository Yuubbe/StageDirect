"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface EntrepriseContact {
  nom_entreprise: string
}

interface Contact {
  id_contact: number
  nom_contact: string
  tel_contact?: string
  email_contact?: string
  entreprises: EntrepriseContact[]
}

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contact")

        if (!res.ok) {
          throw new Error(`Erreur ${res.status} lors de la récupération des contacts.`)
        }

        const data = await res.json()
        setContacts(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des contacts :", error)
        setError("Impossible de récupérer les contacts.")
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Liste des contacts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <p className="text-red-500 p-4 bg-red-50 rounded-md">{error}</p>
            ) : contacts.length === 0 ? (
              <p className="text-center text-muted-foreground">Aucun contact trouvé.</p>
            ) : (
              <div className="overflow-x-auto">
                <motion.table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Nom</th>
                      <th className="px-4 py-3 text-left font-medium">Téléphone</th>
                      <th className="px-4 py-3 text-left font-medium">Email</th>
                      <th className="px-4 py-3 text-left font-medium">Entreprises</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <motion.tr key={contact.id_contact} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">{contact.nom_contact}</td>
                        <td className="px-4 py-3">{contact.tel_contact || "N/A"}</td>
                        <td className="px-4 py-3">{contact.email_contact || "N/A"}</td>
                        <td className="px-4 py-3">
                          {contact.entreprises.length > 0
                            ? contact.entreprises.map((e: EntrepriseContact) => e.nom_entreprise).join(", ")
                            : "Aucune"}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </motion.table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
