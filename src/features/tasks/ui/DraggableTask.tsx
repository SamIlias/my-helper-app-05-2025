import { useDraggable } from '@dnd-kit/core';
import { TaskItem, TaskItemProps } from '@/features/tasks/ui/TaskItem';
import React from 'react';

export const DraggableTask: React.FC<TaskItemProps> = React.memo(
  ({ task, onEditTask, deleteTask }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: task.id,
    });

    const style: React.CSSProperties = isDragging
      ? {
          position: 'relative',
          zIndex: 999,
          transform: `translate(${transform?.x}px, ${transform?.y}px)`,
        }
      : {};

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="border rounded px-3 py-1 mb-2 cursor-move bg-white dark:bg-stone-800"
      >
        <TaskItem task={task} onEditTask={onEditTask} deleteTask={deleteTask} />
      </div>
    );
  },
);
