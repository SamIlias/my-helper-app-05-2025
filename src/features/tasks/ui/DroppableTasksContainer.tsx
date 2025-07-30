import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskType } from '../model/types';
import { SortableTaskItem } from '@/features/tasks/ui/SortableTaskItem';

export const DroppableTasksContainer: React.FC<{
  id: string;
  title: string;
  tasks: TaskType[];
  className?: string;
}> = ({ id, title, tasks, className = '' }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full flex gap-2 flex-col min-h-32 p-4 rounded-lg transition-colors ${className} ${
        isOver ? 'ring-2 ring-blue-400 bg-blue-50/10' : ''
      }`}
    >
      <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        {tasks.length ? (
          tasks.map((t) => <SortableTaskItem key={t.id} id={t.id} task={t} />)
        ) : (
          <p className="text-center text-gray-500 py-8">Empty</p>
        )}
      </SortableContext>
    </div>
  );
};
