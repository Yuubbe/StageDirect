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
        console.log("Contacts récupérés :", data) // Ajoutez ce log
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

  // Pagination Logic
  const indexOfLastContact = currentPage * contactsPerPage
  const indexOfFirstContact = indexOfLastContact - contactsPerPage
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact)

  // Find duplicate contacts
  const findDuplicates = (contacts: Contact[]) => {
    const seen = new Set()
    return contacts.filter(contact => {
      const contactKey = `${contact.nom_contact}-${contact.tel_contact}-${contact.email_contact}`
      if (seen.has(contactKey)) {
        return true
      }
      seen.add(contactKey)
      return false
    })
  }

  const duplicateContacts = findDuplicates(contacts)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Fusionner les contacts
  const mergeContacts = async (contactId1: number, contactId2: number) => {
    try {
      const res = await fetch("/api/merge-contacts", {
        method: "POST",
        body: JSON.stringify({ contactId1, contactId2 }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        throw new Error("Erreur lors de la fusion des contacts.")
      }

      // Recharger les contacts après la fusion
      const data = await res.json()
      setContacts(data)
    } catch (error) {
      console.error("Erreur lors de la fusion des contacts :", error)
      setError("Impossible de fusionner les contacts.")
    }
  }

  // Fusionner tous les contacts dupliqués
  const mergeAllContacts = async () => {
    try {
      // Récupérer toutes les paires de contacts à fusionner
      const mergePairs = []
      for (let i = 0; i < duplicateContacts.length; i++) {
        if (i < duplicateContacts.length - 1) {
          mergePairs.push({ contactId1: duplicateContacts[i].id_contact, contactId2: duplicateContacts[i + 1].id_contact })
        }
      }

      // Envoyer la fusion de toutes les paires
      for (const { contactId1, contactId2 } of mergePairs) {
        await mergeContacts(contactId1, contactId2)
      }
    } catch (error) {
      console.error("Erreur lors de la fusion des contacts dupliqués :", error)
      setError("Impossible de fusionner tous les contacts.")
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <Button variant="outline" onClick={() => router.push("/")} className="mb-4 transition-all hover:translate-x-[-2px]">
        &larr; Retour à l&apos;accueil
      </Button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Tableau Paginé */}
        <Card className="w-full shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Liste des contacts (Paginée)</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Chargement...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300">
                    <thead>
                      <tr className="bg-muted/50 border-b border-gray-300">
                        <th className="px-6 py-4">Nom</th>
                        <th className="px-6 py-4">Téléphone</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Entreprises</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentContacts.map((contact) => (
                        <tr key={contact.id_contact} className="border-b border-gray-300">
                          <td className="px-6 py-4">{contact.nom_contact}</td>
                          <td className="px-6 py-4">{contact.tel_contact}</td>
                          <td className="px-6 py-4">{contact.email_contact}</td>
                          <td className="px-6 py-4">{contact.entreprises.map(e => e.nom_entreprise).join(", ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center mt-6 gap-2">
                  <Button variant="outline" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Précédent
                  </Button>
                  <span>Page {currentPage}</span>
                  <Button variant="outline" onClick={() => paginate(currentPage + 1)} disabled={indexOfLastContact >= contacts.length}>
                    Suivant
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Tableau des Contacts Dupliqués */}
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Contacts dupliqués</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Chargement...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-muted/50 border-b border-gray-300">
                      <th className="px-6 py-4">Nom</th>
                      <th className="px-6 py-4">Téléphone</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Entreprises</th>
                      <th className="px-6 py-4">Fusionner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {duplicateContacts.map((contact, index) => (
                      <tr key={contact.id_contact} className="border-b border-gray-300">
                        <td className="px-6 py-4">{contact.nom_contact}</td>
                        <td className="px-6 py-4">{contact.tel_contact}</td>
                        <td className="px-6 py-4">{contact.email_contact}</td>
                        <td className="px-6 py-4">{contact.entreprises.map(e => e.nom_entreprise).join(", ")}</td>
                        <td className="px-6 py-4">
                          {index < duplicateContacts.length - 1 && (
                            <Button variant="outline" onClick={() => mergeContacts(contact.id_contact, duplicateContacts[index + 1].id_contact)}>
                              Fusionner
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bouton "Tout fusionner" */}
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={mergeAllContacts} disabled={duplicateContacts.length === 0}>
            Tout Fusionner
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
