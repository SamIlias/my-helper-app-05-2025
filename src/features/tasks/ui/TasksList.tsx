import React from 'react';
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableTaskItem } from '@/features/tasks/ui/SortableTaskItem';
import { TaskType } from '@/features/tasks';
import { DroppableTasksContainer } from '@/features/tasks/ui/DroppableTasksContainer';
import { containersId, useDnD } from '@/features/tasks/model/useDnD';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

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
  const mainContainerStyle =
    'bg-stone-500/40 transition shadow-lg duration-800 ease-in-out h-full ';

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
          className={`hover:bg-red-500/20 ${mainContainerStyle}`}
        />
        <DroppableTasksContainer
          id={containersId.inProgress}
          title="Tasks in progress"
          tasks={inProgressTasks}
          className={`hover:bg-yellow-300/20 ${mainContainerStyle}`}
        />
        <DroppableTasksContainer
          id={containersId.completed}
          title="Completed"
          tasks={completedTasks}
          className={`hover:bg-lime-300/20 ${mainContainerStyle}`}
        />
      </div>

      {/* Drag Overlay */}
      <DragOverlay dropAnimation={dropAnimation}>
        {taskInDrag ? <SortableTaskItem id={taskInDrag.id} task={taskInDrag} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
