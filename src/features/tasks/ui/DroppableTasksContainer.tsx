import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskType } from '../model/types';
import { SortableTaskItem } from '@/features/tasks/ui/SortableTaskItem';
import { taskContainerTitle, textColors } from '@/shared/myStyles/myStyles';

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
      className={`w-full flex gap-2 flex-col min-h-32 p-2 rounded-lg ${className} ${
        isOver ? 'ring-2 ring-blue-400 bg-blue-50/10' : ''
      }`}
    >
      <h3 className={`${taskContainerTitle}`}>{title}</h3>
      <main className={`overflow-auto custom-scrollbar  flex gap-2 flex-col min-h-32 rounded-lg`}>
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length ? (
            tasks.map((t) => <SortableTaskItem key={t.id} id={t.id} task={t} />)
          ) : (
            <p className={`text-center py-8 ${textColors.placeholder}`}>Empty</p>
          )}
        </SortableContext>
      </main>
    </div>
  );
};
