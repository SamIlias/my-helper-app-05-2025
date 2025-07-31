import React from 'react';
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableTaskItem } from '@/features/tasks/ui/SortableTaskItem';
import { TaskType } from '@/features/tasks';
import { DroppableTasksContainer } from '@/features/tasks/ui/DroppableTasksContainer';
import { containersId, useDnD } from '@/features/tasks/model/useDnD';
import { useList } from '@/features/tasks/model/useList';

export const TasksList: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  const {
    activeTaskId,
    newAddedTask,
    onTaskClick,
    newTaskElementAnchor,
    onDeleteTask,
    onEditClick,
    editTaskMode,
    closeEditForm,
    onEditFormSubmit,
    isMobile,
    isShowDescriptionBlockOnMobile,
    closeDescriptionOnMobile,
    // queueTasks,
    // inProgressTasks,
    // completedTasks,
    setActiveTaskId,
    updateTaskStatus,
  } = useList(tasks);

  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
    sensors,
    dropAnimation,
    activeTask,
    queueTasks,
    inProgressTasks,
    completedTasks,
  } = useDnD(tasks, updateTaskStatus);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex w-full gap-4">
        <DroppableTasksContainer
          id={containersId.queue}
          title="Task queue"
          tasks={queueTasks}
          className="bg-red-500/40"
        />
        <DroppableTasksContainer
          id={containersId.inProgress}
          title="Tasks in progress"
          tasks={inProgressTasks}
          className="bg-orange-500/40"
        />
        <DroppableTasksContainer
          id={containersId.completed}
          title="Completed"
          tasks={completedTasks}
          className="bg-green-500/30"
        />
      </div>

      {/* Drag Overlay */}
      <DragOverlay dropAnimation={dropAnimation}>
        {activeTask ? <SortableTaskItem id={activeTask.id} task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
