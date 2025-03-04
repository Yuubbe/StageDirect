"use client"

import type React from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { type CardType, labelColors, avatarColors } from "./kanban-board"
import { Calendar, MoreVertical, Edit, Trash } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import CardEditModal from "./card-edit-modal"

interface CardProps {
  card: CardType
  onUpdate?: (updatedCard: CardType) => void
  onDelete?: (cardId: string) => void
}

export default function Card({ card, onUpdate, onDelete }: CardProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: {
      type: "card",
      card,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDropdown(false)
    setShowEditModal(true)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDropdown(false)
    if (onDelete) onDelete(card.id)
  }

  const handleCardUpdate = (updatedCard: CardType) => {
    if (onUpdate) onUpdate(updatedCard)
    setShowEditModal(false)
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-white p-3 rounded-lg shadow-sm border border-gray-100 cursor-grab hover:shadow-md ${
          isDragging ? "opacity-70 ring-2 ring-indigo-400 shadow-lg rotate-2" : ""
        } transition-all duration-200 relative group`}
      >
        {/* Priority indicator */}
        {card.priority && (
          <div
            className={`absolute -left-1 -top-1 w-3 h-3 rounded-full ${
              card.priority === "high" ? "bg-red-500" : card.priority === "medium" ? "bg-yellow-500" : "bg-blue-500"
            } shadow-sm z-10`}
          />
        )}

        {/* Card menu button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowDropdown(!showDropdown)
          }}
          className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all duration-200"
        >
          <MoreVertical className="h-3 w-3 text-gray-500" />
        </button>

        {/* Dropdown menu */}
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-8 right-2 bg-white shadow-lg rounded-lg p-2 z-50 min-w-[120px] border border-gray-100"
          >
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md"
            >
              <Edit className="h-3 w-3" /> Modifier
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 w-full text-left px-2 py-1 text-sm hover:bg-red-50 text-red-600 rounded-md"
            >
              <Trash className="h-3 w-3" /> Supprimer
            </button>
          </motion.div>
        )}

        {card.labels && card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {card.labels.map((label) => (
              <motion.span
                key={label}
                whileHover={{ scale: 1.1 }}
                className={`${labelColors[label] || "bg-gray-500"} text-white text-xs px-2 py-0.5 rounded-full`}
              >
                {label}
              </motion.span>
            ))}
          </div>
        )}

        <h4 className="font-medium text-gray-800 mb-1 pr-5">{card.title}</h4>

        {card.description && <p className="text-sm text-gray-500 mb-3">{card.description}</p>}

        <div className="flex items-center justify-between mt-2">
          {card.dueDate && (
            <div
              className={`flex items-center text-xs ${card.isOverdue ? "text-red-500 font-medium" : "text-gray-500"}`}
            >
              <Calendar className="h-3 w-3 mr-1" />
              {card.dueDate}
            </div>
          )}

          {card.assignee && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`${avatarColors[card.assignee] || "bg-gray-500"} h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-medium`}
              title={card.assignee}
            >
              {card.assignee.charAt(0)}
            </motion.div>
          )}
        </div>
      </div>

      {showEditModal && <CardEditModal card={card} onClose={() => setShowEditModal(false)} onSave={handleCardUpdate} />}
    </>
  )
}

