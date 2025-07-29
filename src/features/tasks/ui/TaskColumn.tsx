import { TaskStatus, TaskType } from '@/features/tasks/model/types';
import React from 'react';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { SortableTaskItem } from '@/features/tasks/ui/SortableTaskItem';

type TaskColumnProps = {
  id: TaskStatus;
  title: string;
  tasks: TaskType[];
  deleteTask: (id: string) => void;
  onEditTask: (task: TaskType) => void;
};

export const TaskColumn: React.FC<TaskColumnProps> = React.memo(
  ({ id, title, tasks, onEditTask, deleteTask }) => {
    return (
      <div className="flex-1 border p-2 rounded shadow-md">
        <h1>{title}</h1>
        <SortableContext items={tasks} strategy={rectSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskItem
              key={task.id}
              id={task.id}
              task={task}
              onEditTask={onEditTask}
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>
    );
  },
);
