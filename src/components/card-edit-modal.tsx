"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { type CardType, labelColors, avatarColors } from "./kanban-board"
import { X, Tag, User, AlertTriangle } from "lucide-react"

interface CardEditModalProps {
  card: CardType
  onClose: () => void
  onSave: (updatedCard: CardType) => void
}

// Available labels and assignees
const availableLabels = ["Design", "Urgent", "Backend", "Sécurité", "Maintenance", "Terminé", "Bug", "Feature"]
const availableAssignees = ["Sophie", "Thomas", "Julie", "Marc", "Alex", "Emma"]

export default function CardEditModal({ card, onClose, onSave }: CardEditModalProps) {
  const [editedCard, setEditedCard] = useState<CardType>({ ...card })
  const [showLabelSelector, setShowLabelSelector] = useState(false)
  const [showAssigneeSelector, setShowAssigneeSelector] = useState(false)

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const handleSave = () => {
    onSave(editedCard)
  }

  const toggleLabel = (label: string) => {
    const currentLabels = editedCard.labels || []
    if (currentLabels.includes(label)) {
      setEditedCard({
        ...editedCard,
        labels: currentLabels.filter((l) => l !== label),
      })
    } else {
      setEditedCard({
        ...editedCard,
        labels: [...currentLabels, label],
      })
    }
  }

  const setPriority = (priority: "high" | "medium" | "low" | undefined) => {
    setEditedCard({
      ...editedCard,
      priority,
    })
  }

  const setAssignee = (assignee: string | undefined) => {
    setEditedCard({
      ...editedCard,
      assignee,
    })
    setShowAssigneeSelector(false)
  }

  const setDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCard({
      ...editedCard,
      dueDate: e.target.value,
    })
  }

  const setIsOverdue = (isOverdue: boolean) => {
    setEditedCard({
      ...editedCard,
      isOverdue,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Modifier la carte</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Titre</label>
            <input
              type="text"
              value={editedCard.title}
              onChange={(e) => setEditedCard({ ...editedCard, title: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={editedCard.description || ""}
              onChange={(e) => setEditedCard({ ...editedCard, description: e.target.value })}
              rows={3}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">Priorité</label>
            <div className="flex gap-2">
              <button
                onClick={() => setPriority("high")}
                className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                  editedCard.priority === "high"
                    ? "bg-red-100 text-red-700 border-2 border-red-300"
                    : "bg-gray-100 hover:bg-red-50 text-gray-700"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                Urgent
              </button>
              <button
                onClick={() => setPriority("medium")}
                className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                  editedCard.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-300"
                    : "bg-gray-100 hover:bg-yellow-50 text-gray-700"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                Moyen
              </button>
              <button
                onClick={() => setPriority("low")}
                className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                  editedCard.priority === "low"
                    ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                    : "bg-gray-100 hover:bg-blue-50 text-gray-700"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                Faible
              </button>
              {editedCard.priority && (
                <button
                  onClick={() => setPriority(undefined)}
                  className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Aucune
                </button>
              )}
            </div>
          </div>

          {/* Labels */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Étiquettes</label>
            <div className="flex flex-wrap gap-1 mb-2">
              {editedCard.labels && editedCard.labels.length > 0 ? (
                editedCard.labels.map((label) => (
                  <span
                    key={label}
                    className={`${labelColors[label] || "bg-gray-500"} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                  >
                    {label}
                    <button
                      onClick={() => toggleLabel(label)}
                      className="hover:bg-white/20 rounded-full h-4 w-4 flex items-center justify-center"
                    >
                      <X className="h-2 w-2" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">Aucune étiquette</span>
              )}
            </div>

            <button
              onClick={() => setShowLabelSelector(!showLabelSelector)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Tag className="h-3 w-3" />
              {showLabelSelector ? "Masquer les étiquettes" : "Ajouter une étiquette"}
            </button>

            {showLabelSelector && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 p-2 bg-white border rounded-lg shadow-md grid grid-cols-2 gap-1"
              >
                {availableLabels.map((label) => (
                  <button
                    key={label}
                    onClick={() => toggleLabel(label)}
                    className={`${
                      editedCard.labels?.includes(label) ? "ring-2 ring-offset-1" : ""
                    } ${labelColors[label] || "bg-gray-500"} text-white text-xs px-2 py-1 rounded-full text-left`}
                  >
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date d'échéance</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={editedCard.dueDate || ""}
                onChange={setDueDate}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />

              {editedCard.dueDate && (
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={editedCard.isOverdue}
                      onChange={(e) => setIsOverdue(e.target.checked)}
                      className="rounded text-red-500 focus:ring-red-500"
                    />
                    <span className="text-red-500 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      En retard
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Assignee */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Assigné à</label>
            <div className="flex items-center gap-2 mb-2">
              {editedCard.assignee ? (
                <div className="flex items-center gap-2">
                  <div
                    className={`${avatarColors[editedCard.assignee] || "bg-gray-500"} h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-medium`}
                  >
                    {editedCard.assignee.charAt(0)}
                  </div>
                  <span>{editedCard.assignee}</span>
                  <button onClick={() => setAssignee(undefined)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <span className="text-sm text-gray-500">Non assigné</span>
              )}
            </div>

            <button
              onClick={() => setShowAssigneeSelector(!showAssigneeSelector)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <User className="h-3 w-3" />
              {showAssigneeSelector ? "Masquer les membres" : "Assigner à un membre"}
            </button>

            {showAssigneeSelector && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 p-2 bg-white border rounded-lg shadow-md flex flex-wrap gap-2"
              >
                {availableAssignees.map((assignee) => (
                  <button
                    key={assignee}
                    onClick={() => setAssignee(assignee)}
                    className={`flex items-center gap-1 p-1 rounded-lg hover:bg-gray-100 ${
                      editedCard.assignee === assignee ? "bg-blue-50 ring-1 ring-blue-300" : ""
                    }`}
                  >
                    <div
                      className={`${avatarColors[assignee] || "bg-gray-500"} h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-medium`}
                    >
                      {assignee.charAt(0)}
                    </div>
                    <span className="text-sm">{assignee}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        <div className="p-4 border-t sticky bottom-0 bg-white flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border hover:bg-gray-50">
            Annuler
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Enregistrer
          </button>
        </div>
      </motion.div>
    </div>
  )
}

