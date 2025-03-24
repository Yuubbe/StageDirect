"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function EntrepriseList() {
  const [entreprises, setEntreprises] = useState<any[]>([])
  const [dupli, setDupli] = useState<any[]>([]) 
  const [loadingEntreprises, setLoadingEntreprises] = useState<boolean>(true)
  const [loadingDupli, setLoadingDupli] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const [currentPage, setCurrentPage] = useState(1)
  const [entreprisesPerPage] = useState(5)

  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const res = await fetch("/api/entreprises")
        if (!res.ok) {
          throw new Error(`Erreur lors de la récupération des entreprises : ${res.status}`)
        }
        const data = await res.json()

        if (Array.isArray(data) && data.length > 0) {
          setEntreprises(data)
        } else {
          setEntreprises([])
        }
        setLoadingEntreprises(false)
      } catch (error) {
        console.error("Erreur lors de la récupération des entreprises:", error)
        setError("Une erreur est survenue lors de la récupération des entreprises.")
        setLoadingEntreprises(false)
      }
    }

    fetchEntreprises()
  }, [])

  useEffect(() => {
    const fetchDupli = async () => {
      try {
        const res = await fetch("/api/dupli")
        if (!res.ok) {
          throw new Error(`Erreur lors de la récupération des entreprises dupli : ${res.status}`)
        }
        const data = await res.json()

        if (Array.isArray(data) && data.length > 0) {
          setDupli(data)
        } else {
          setDupli([])
        }
        setLoadingDupli(false)
      } catch (error) {
        console.error("Erreur lors de la récupération des entreprises dupli:", error)
        setError("Une erreur est survenue lors de la récupération des entreprises dupli.")
        setLoadingDupli(false)
      }
    }

    fetchDupli()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const filteredEntreprises = entreprises.filter((entreprise) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return (
      entreprise.nom_entreprise.toLowerCase().includes(lowerCaseSearchTerm) ||
      entreprise.ville_entreprise.toLowerCase().includes(lowerCaseSearchTerm) ||
      entreprise.pays_entreprise.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })

  const filteredDupli = dupli.filter((entreprise) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return (
      entreprise.nom_entreprise.toLowerCase().includes(lowerCaseSearchTerm) ||
      entreprise.ville_entreprise.toLowerCase().includes(lowerCaseSearchTerm) ||
      entreprise.pays_entreprise.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })

  const indexOfLastEntreprise = currentPage * entreprisesPerPage
  const indexOfFirstEntreprise = indexOfLastEntreprise - entreprisesPerPage
  const currentEntreprises = filteredEntreprises.slice(indexOfFirstEntreprise, indexOfLastEntreprise)

  const indexOfLastDupli = currentPage * entreprisesPerPage
  const indexOfFirstDupli = indexOfLastDupli - entreprisesPerPage
  const currentDupli = filteredDupli.slice(indexOfFirstDupli, indexOfLastDupli)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  const handleAddEntreprise = () => {
    console.log("Ajouter une entreprise")
  }

  return (
    <div className="container mx-auto py-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-full mx-auto shadow-lg mb-10">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Liste des entreprises</CardTitle>
              <CardDescription>Voici les entreprises présentes dans la base de données :</CardDescription>
            </div>
            <Button onClick={handleAddEntreprise} className="transition-all duration-300 hover:scale-105">
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter une entreprise
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Rechercher par nom, ville, ou pays..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {loadingEntreprises ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 p-4 bg-red-50 rounded-md"
              >
                {error}
              </motion.p>
            ) : (
              <>
                {filteredEntreprises.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Aucune entreprise trouvée.
                  </motion.p>
                ) : (
                  <div className="overflow-x-auto">
                    <motion.table
                      className="min-w-full table-auto"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium">Nom</th>
                          <th className="px-4 py-3 text-left font-medium">Ville</th>
                          <th className="px-4 py-3 text-left font-medium">Pays</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEntreprises.map((entreprise) => (
                          <motion.tr
                            key={entreprise.id_entreprise}
                            variants={itemVariants}
                            className="border-b hover:bg-muted/30 transition-colors"
                          >
                            <td className="px-4 py-3">{entreprise.nom_entreprise}</td>
                            <td className="px-4 py-3">{entreprise.ville_entreprise}</td>
                            <td className="px-4 py-3">{entreprise.pays_entreprise}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </motion.table>
                    <div className="flex justify-center mt-4">
                      <Button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Précédent
                      </Button>
                      <span className="mx-4">{currentPage}</span>
                      <Button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage * entreprisesPerPage >= filteredEntreprises.length}
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="max-w-full mx-auto shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Liste des entreprises dupliquées</CardTitle>
              <CardDescription>Voici les entreprises dupliquées dans la base de données :</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {loadingDupli ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 p-4 bg-red-50 rounded-md"
              >
                {error}
              </motion.p>
            ) : (
              <>
                {filteredDupli.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Aucune entreprise dupliquée trouvée.
                  </motion.p>
                ) : (
                  <div className="overflow-x-auto">
                    <motion.table
                      className="min-w-full table-auto"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium">Nom</th>
                          <th className="px-4 py-3 text-left font-medium">Ville</th>
                          <th className="px-4 py-3 text-left font-medium">Pays</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentDupli.map((entreprise) => (
                          <motion.tr
                            key={entreprise.id_entreprise}
                            variants={itemVariants}
                            className="border-b hover:bg-muted/30 transition-colors"
                          >
                            <td className="px-4 py-3">{entreprise.nom_entreprise}</td>
                            <td className="px-4 py-3">{entreprise.ville_entreprise}</td>
                            <td className="px-4 py-3">{entreprise.pays_entreprise}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </motion.table>
                    <div className="flex justify-center mt-4">
                      <Button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Précédent
                      </Button>
                      <span className="mx-4">{currentPage}</span>
                      <Button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage * entreprisesPerPage >= filteredDupli.length}
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
