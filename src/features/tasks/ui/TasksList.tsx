import React from 'react';
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableTaskItem } from '@/features/tasks/ui/SortableTaskItem';
import { TaskType } from '@/features/tasks';
import { DroppableTasksContainer } from '@/features/tasks/ui/DroppableTasksContainer';
import { containersId, useDnD } from '@/features/tasks/model/useDnD';
import { useList } from '@/features/tasks/model/useList';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export const TasksList: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  const {
    activeTaskId,
    newAddedTask,
    onTaskClick,
    newTaskElementAnchor,
    // onDeleteTask,
    onEditClick,
    editTaskMode,
    closeEditForm,
    onEditFormSubmit,
    isMobile,
    isShowDescriptionBlockOnMobile,
    closeDescriptionOnMobile,
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
    queueTasks,
    inProgressTasks,
    completedTasks,
  } = useDnD(tasks, updateTaskStatus);

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
      <div className="flex w-full h-full justify-around gap-2 overflow-auto">
        <DroppableTasksContainer
          id={containersId.queue}
          title="Task queue"
          tasks={queueTasks}
          className="bg-red-300/10 hover:bg-red-500/20 transition shadow-lg duration-800 ease-in-out h-full overflow-y-auto custom-scrollbar "
        />
        <DroppableTasksContainer
          id={containersId.inProgress}
          title="Tasks in progress"
          tasks={inProgressTasks}
          className="bg-yellow-300/10 hover:bg-yellow-500/20 transition duration-800 ease-in-out shadow-lg overflow-y-auto custom-scrollbar"
        />
        <DroppableTasksContainer
          id={containersId.completed}
          title="Completed"
          tasks={completedTasks}
          className="bg-green-300/20 hover:bg-green-400/20 transition duration-800 ease-in-out shadow-lg overflow-y-auto custom-scrollbar"
        />
      </div>

      {/* Drag Overlay */}
      <DragOverlay dropAnimation={dropAnimation}>
        {taskInDrag ? <SortableTaskItem id={taskInDrag.id} task={taskInDrag} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
