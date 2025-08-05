import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { TaskType } from '@/features/tasks';
import { TaskItem } from '@/features/tasks/ui/TaskItem';

type Props = {
  id: string;
  task: TaskType;
  // deleteTask: (id: string) => void;
  // onEditTask: (task: TaskType) => void;
};

// export const SortableTaskItem: React.FC<Props> = ({ id, task, deleteTask, onEditTask }) => {
export const SortableTaskItem: React.FC<Props> = ({ id, task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    // <div
    //   ref={setNodeRef}
    //   style={style}
    //   className="border w-full flex justify-between items-center p-2"
    //   {...attributes}
    // >
    //   {/* Task content */}
    //   <TaskItem task={task} />
    //
    //   {/* Drag handle */}
    //   <div {...listeners} className="cursor-grab px-2 select-none" title="Drag">
    //     ⠿
    //   </div>
    // </div>
    <div
      ref={setNodeRef}
      style={style}
      className="border cursor-grab w-full "
      {...attributes}
      {...listeners}
    >
      {/*<TaskItem task={task} deleteTask={deleteTask} onEditTask={onEditTask} />*/}
      <TaskItem task={task} />
    </div>
  );
};
