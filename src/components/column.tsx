"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { ColumnType, CardType } from "./kanban-board"
import Card from "./card"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Plus, MoreHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ColumnProps {
  column: ColumnType
  onAddCard: () => void
  onUpdateCard?: (updatedCard: CardType) => void
  onDeleteCard?: (cardId: string) => void
}

export default function Column({ column, onAddCard, onUpdateCard, onDeleteCard }: ColumnProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white/80 backdrop-blur-sm rounded-xl p-3 min-w-[280px] max-w-[280px] h-fit shrink-0 shadow-md ${
        isDragging ? "opacity-60 ring-2 ring-indigo-400 shadow-xl z-50" : ""
      } transition-all duration-200`}
    >
      <div
        className="flex items-center justify-between mb-3 cursor-grab p-1 rounded-lg hover:bg-gray-100/80 transition-colors"
        {...attributes}
        {...listeners}
      >
        <h3 className="font-semibold text-gray-800">{column.title}</h3>
        <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
          <MoreHorizontal className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      <div className="flex flex-col gap-3 min-h-[10px]">
        <SortableContext items={column.cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {column.cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card card={card} onUpdate={onUpdateCard} onDelete={onDeleteCard} />
              </motion.div>
            ))}
          </AnimatePresence>
        </SortableContext>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAddCard}
        className="mt-3 flex w-full items-center gap-1.5 rounded-lg p-2 text-sm text-indigo-600 hover:bg-indigo-50/80 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Ajouter une carte
      </motion.button>
    </div>
  )
}

