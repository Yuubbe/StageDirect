'use client';
import { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SortableItem from './SortableItem';

const KanbanBoard = ({ userId, columns, setColumns }) => {
  const [newColumnName, setNewColumnName] = useState('');
  const [newCardContent, setNewCardContent] = useState('');
  const [selectedColumn, setSelectedColumn] = useState(null);

  useEffect(() => {
    fetch(`/api/kanban/${userId}`)
      .then((res) => res.json())
      .then((data) => setColumns(data.columns || []))
      .catch((error) => console.error('Erreur lors du chargement des colonnes :', error));
  }, [userId, setColumns]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setColumns((items) => arrayMove(items, active.id, over.id));
  };

  const addColumn = () => {
    if (newColumnName.trim()) {
      const newColumn = { id: columns.length, name: newColumnName, items: [] };
      setColumns([...columns, newColumn]);
      setNewColumnName('');
    }
  };

  const addCard = () => {
    if (newCardContent.trim() && selectedColumn !== null) {
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === selectedColumn
            ? { ...col, items: [...col.items, { id: `${col.items.length}-${Date.now()}`, content: newCardContent }] }
            : col
        )
      );
      setNewCardContent('');
      setSelectedColumn(null);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={columns} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-4 gap-4">
          {columns.map((column) => (
            <Card key={column.id} className="p-4 bg-white shadow-md">
              <h2 className="font-bold mb-2">{column.name}</h2>
              {column.items.map((item) => (
                <SortableItem key={item.id} id={item.id} content={item.content} />
              ))}
              <input
                value={newCardContent}
                onChange={(e) => {
                  setNewCardContent(e.target.value);
                  setSelectedColumn(column.id);
                }}
                placeholder="Nouvelle carte"
                className="mb-2 p-2 border rounded w-full"
              />
              <Button onClick={addCard} className="w-full">Ajouter carte</Button>
            </Card>
          ))}
          <div>
            <input
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="Nouvelle colonne"
              className="mb-2 p-2 border rounded"
            />
            <Button onClick={addColumn}>Ajouter colonne</Button>
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default KanbanBoard;