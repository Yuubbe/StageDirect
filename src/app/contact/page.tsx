"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1)
  const contactsPerPage = 5

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contact")

        if (!res.ok) {
          throw new Error(`Erreur ${res.status} lors de la récupération des contacts.`)
        }

        const data = await res.json()
        // Filtrer les contacts qui ont des données valides
        const filteredData = data.filter((contact: Contact) => {
          const hasValidPhone = contact.tel_contact && contact.tel_contact !== "N/A"
          const hasValidEmail = contact.email_contact && contact.email_contact !== "N/A"
          const hasValidCompanies = contact.entreprises.length > 0
          return hasValidPhone || hasValidEmail || hasValidCompanies
        })
        setContacts(filteredData)
      } catch (error) {
        console.error("Erreur lors de la récupération des contacts :", error)
        setError("Impossible de récupérer les contacts.")
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  // Pagination Logic
  const indexOfLastContact = currentPage * contactsPerPage
  const indexOfFirstContact = indexOfLastContact - contactsPerPage
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Bouton Retour à l'accueil */}
      <Button
        variant="outline"
        onClick={() => router.push("/")}
        className="mb-4 transition-all hover:translate-x-[-2px]"
      >
        &larr; Retour à l&apos;accueil
      </Button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full shadow-lg">
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
              <>
                <div className="overflow-x-auto">
                  <motion.table className="w-full table-auto border border-gray-300">
                    <thead>
                      <tr className="bg-muted/50 border-b border-gray-300">
                        <th className="px-6 py-4 text-left font-medium">Nom</th>
                        <th className="px-6 py-4 text-left font-medium">Téléphone</th>
                        <th className="px-6 py-4 text-left font-medium">Email</th>
                        <th className="px-6 py-4 text-left font-medium">Entreprises</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentContacts.map((contact) => (
                        <motion.tr key={contact.id_contact} className="border-b border-gray-300 hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">{contact.nom_contact}</td>
                          <td className="px-6 py-4">{contact.tel_contact}</td>
                          <td className="px-6 py-4">{contact.email_contact}</td>
                          <td className="px-6 py-4">
                            {contact.entreprises.map((e: EntrepriseContact) => e.nom_entreprise).join(", ")}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </motion.table>
                </div>

                {/* Pagination */}
                <motion.div
                  className="flex justify-center mt-6 gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="transition-all duration-200 hover:translate-x-[-2px]"
                  >
                    Précédent
                  </Button>
                  <span className="flex items-center px-4 font-medium">Page {currentPage}</span>
                  <Button
                    variant="outline"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastContact >= contacts.length}
                    className="transition-all duration-200 hover:translate-x-[2px]"
                  >
                    Suivant
                  </Button>
                </motion.div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
