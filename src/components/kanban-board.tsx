"use client"

import { useState, useEffect } from "react"
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import Column from "./column"
import Card from "./card"
import { PlusCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Types
export type CardType = {
  id: string
  title: string
  description?: string
  labels?: string[]
  dueDate?: string
  assignee?: string
  priority?: "high" | "medium" | "low"
  isOverdue?: boolean
}

export type ColumnType = {
  id: string
  title: string
  cards: CardType[]
}

// Initial data
const initialColumns: ColumnType[] = [
  {
    id: "column-1",
    title: "À faire",
    cards: [
      {
        id: "card-1",
        title: "Créer un design",
        description: "Faire un design pour la nouvelle page d'accueil",
        labels: ["Design", "Urgent"],
        dueDate: "2023-12-15",
        assignee: "Sophie",
        priority: "high",
      },
      {
        id: "card-2",
        title: "Implémenter l'authentification",
        description: "Ajouter la connexion avec Google",
        labels: ["Backend", "Sécurité"],
        assignee: "Thomas",
        priority: "medium",
      },
    ],
  },
  {
    id: "column-2",
    title: "En cours",
    cards: [
      {
        id: "card-3",
        title: "Refactoriser le code",
        description: "Nettoyer le code legacy",
        labels: ["Maintenance"],
        assignee: "Julie",
        priority: "low",
      },
    ],
  },
  {
    id: "column-3",
    title: "Terminé",
    cards: [
      {
        id: "card-4",
        title: "Mise à jour des dépendances",
        description: "Mettre à jour React et Next.js",
        labels: ["Maintenance", "Terminé"],
        dueDate: "2023-12-01",
        assignee: "Marc",
        isOverdue: true,
      },
    ],
  },
]

// Label colors
export const labelColors: Record<string, string> = {
  Design: "bg-purple-500",
  Urgent: "bg-red-500",
  Backend: "bg-blue-500",
  Sécurité: "bg-yellow-500",
  Maintenance: "bg-green-500",
  Terminé: "bg-gray-500",
  Bug: "bg-orange-500",
  Feature: "bg-teal-500",
}

// Avatar colors
export const avatarColors: Record<string, string> = {
  Sophie: "bg-pink-500",
  Thomas: "bg-blue-500",
  Julie: "bg-purple-500",
  Marc: "bg-green-500",
  Alex: "bg-indigo-500",
  Emma: "bg-amber-500",
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnType[]>([])
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null)
  const [activeCard, setActiveCard] = useState<CardType | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setColumns(initialColumns)
      setLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  )

  // Handle drag start
  const handleDragStart = (event: any) => {
    const { active } = event
    const activeId = active.id

    // Check if we're dragging a column
    if (activeId.toString().includes("column")) {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId)
      if (activeColumnIndex !== -1) {
        setActiveColumn(columns[activeColumnIndex])
      }
      return
    }

    // We're dragging a card
    for (const column of columns) {
      const cardIndex = column.cards.findIndex((card) => card.id === activeId)
      if (cardIndex !== -1) {
        setActiveCard(column.cards[cardIndex])
        return
      }
    }
  }

  // Handle drag end
  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (!over) {
      setActiveColumn(null)
      setActiveCard(null)
      return
    }

    const activeId = active.id
    const overId = over.id

    // Handle column reordering
    if (activeId.toString().includes("column") && overId.toString().includes("column")) {
      const activeIndex = columns.findIndex((col) => col.id === activeId)
      const overIndex = columns.findIndex((col) => col.id === overId)

      if (activeIndex !== overIndex) {
        setColumns(arrayMove(columns, activeIndex, overIndex))
      }
    }

    setActiveColumn(null)
    setActiveCard(null)
  }

  // Add a new column
  const handleAddColumn = () => {
    const newColumn: ColumnType = {
      id: `column-${Date.now()}`,
      title: "Nouvelle colonne",
      cards: [],
    }
    setColumns([...columns, newColumn])
  }

  // Add a new card to a column
  const handleAddCard = (columnId: string) => {
    const newCard: CardType = {
      id: `card-${Date.now()}`,
      title: "Nouvelle tâche",
      description: "Description de la tâche",
      labels: ["Design"],
    }

    setColumns(
      columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            cards: [...column.cards, newCard],
          }
        }
        return column
      }),
    )
  }

  // Update a card
  const handleUpdateCard = (updatedCard: CardType) => {
    setColumns(
      columns.map((column) => {
        const cardIndex = column.cards.findIndex((card) => card.id === updatedCard.id)
        if (cardIndex !== -1) {
          const newCards = [...column.cards]
          newCards[cardIndex] = updatedCard
          return {
            ...column,
            cards: newCards,
          }
        }
        return column
      }),
    )
  }

  // Delete a card
  const handleDeleteCard = (cardId: string) => {
    setColumns(
      columns.map((column) => {
        return {
          ...column,
          cards: column.cards.filter((card) => card.id !== cardId),
        }
      }),
    )
  }

  // Handle card movement between columns
  const handleDragOver = (event: any) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Find the source and destination columns
    let sourceColumnId = ""
    let sourceCardIndex = -1
    let destColumnId = ""

    // Find the source column and card index
    for (const column of columns) {
      const cardIndex = column.cards.findIndex((card) => card.id === activeId)
      if (cardIndex !== -1) {
        sourceColumnId = column.id
        sourceCardIndex = cardIndex
        break
      }
    }

    // If we're hovering over a column, that's our destination
    if (overId.toString().includes("column")) {
      destColumnId = overId
    } else {
      // If we're hovering over a card, find its column
      for (const column of columns) {
        const cardIndex = column.cards.findIndex((card) => card.id === overId)
        if (cardIndex !== -1) {
          destColumnId = column.id
          break
        }
      }
    }

    // If we found both source and destination, and they're different, move the card
    if (sourceColumnId && destColumnId && sourceColumnId !== destColumnId && sourceCardIndex !== -1) {
      setColumns(
        columns.map((column) => {
          // Remove from source column
          if (column.id === sourceColumnId) {
            const newCards = [...column.cards]
            const [movedCard] = newCards.splice(sourceCardIndex, 1)
            return { ...column, cards: newCards }
          }

          // Add to destination column
          if (column.id === destColumnId) {
            return {
              ...column,
              cards: [...column.cards, columns.find((c) => c.id === sourceColumnId)!.cards[sourceCardIndex]],
            }
          }

          return column
        }),
      )
    }
  }

  if (!loaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-blue-400 opacity-75 animate-bounce"></div>
          <p className="mt-4 text-blue-600 font-medium">Chargement du tableau...</p>
        </div>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex gap-4 overflow-x-auto pb-8 pt-2">
        <SortableContext items={columns.map((col) => col.id)} strategy={horizontalListSortingStrategy}>
          <AnimatePresence>
            {columns.map((column, index) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Column
                  column={column}
                  onAddCard={() => handleAddCard(column.id)}
                  onUpdateCard={handleUpdateCard}
                  onDeleteCard={handleDeleteCard}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </SortableContext>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <button
            onClick={handleAddColumn}
            className="flex h-14 items-center gap-2 rounded-xl border-2 border-dashed border-indigo-300 bg-white/60 backdrop-blur-sm px-5 text-sm font-medium text-indigo-600 hover:border-indigo-400 hover:bg-white/80 hover:text-indigo-700 min-w-[272px] shrink-0 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <PlusCircle className="h-5 w-5" />
            Ajouter une colonne
          </button>
        </motion.div>
      </div>

      <DragOverlay>
        {activeColumn && <Column column={activeColumn} onAddCard={() => {}} />}
        {activeCard && <Card card={activeCard} />}
      </DragOverlay>
    </DndContext>
  )
}

