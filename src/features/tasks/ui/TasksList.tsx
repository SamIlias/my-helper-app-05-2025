import React from 'react';
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableTaskItem } from '@/features/tasks/ui/SortableTaskItem';
import { TaskType } from '@/features/tasks';
import { DroppableTasksContainer } from '@/features/tasks/ui/DroppableTasksContainer';
import { containersId, useDnD } from '@/features/tasks/model/useDnD';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { taskContainerStyle } from '@/shared/myStyles/myStyles';

export const TasksList: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
    sensors,
    dropAnimation,
    queueTasks,
    inProgressTasks,
    completedTasks,
  } = useDnD(tasks);

  const { taskInDrag } = useSelector((state: RootState) => state.tasks);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex w-full h-full justify-around gap-2 overflow-hidden">
        <DroppableTasksContainer
          id={containersId.queue}
          title="Task queue"
          tasks={queueTasks}
          className={`hover:bg-red-800/30 dark:hover:bg-red-500/20 ${taskContainerStyle}`}
        />
        <DroppableTasksContainer
          id={containersId.inProgress}
          title="Tasks in progress"
          tasks={inProgressTasks}
          className={`hover:bg-amber-700/30 dark:hover:bg-amber-300/20 ${taskContainerStyle}`}
        />
        <DroppableTasksContainer
          id={containersId.completed}
          title="Completed"
          tasks={completedTasks}
          className={`hover:bg-lime-500/30 dark:hover:bg-lime-300/20 ${taskContainerStyle}`}
        />
      </div>

      {/* Drag Overlay */}
      <DragOverlay dropAnimation={dropAnimation}>
        {taskInDrag ? <SortableTaskItem id={taskInDrag.id} task={taskInDrag} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
