import React, { useState } from 'react';
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { SortableTaskItem } from '@/features/tasks/ui/SortableTaskItem';
import { TaskType } from '@/features/tasks';
import { DroppableTasksContainer } from '@/features/tasks/ui/DroppableTasksContainer';
import { TaskStatus } from '@/features/tasks/model/types';

type ContainerIdType = { [key: string]: TaskStatus };
const containersId: ContainerIdType = {
  queue: 'queue',
  inProgress: 'inProgress',
  completed: 'completed',
};

export const TasksList: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  const [queueTasks, setQueueTasks] = useState<TaskType[]>(
    tasks.filter((t) => t.status === containersId.queue),
  );
  const [inProgressTasks, setInProgressTasks] = useState<TaskType[]>(
    tasks.filter((t) => t.status === containersId.inProgress),
  );
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>(
    tasks.filter((t) => t.status === containersId.completed),
  );
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  // The function for search the task by ID in all the containers
  function findTaskById(id: string): { task: TaskType; container: string } | null {
    let task = queueTasks.find((t) => t.id === id);
    if (task) return { task, container: containersId.queue };

    task = inProgressTasks.find((t) => t.id === id);
    if (task) return { task, container: containersId.inProgress };

    task = completedTasks.find((t) => t.id === id);
    if (task) return { task, container: containersId.completed };

    return null;
  }

  function getTasksByContainer(container: string): TaskType[] {
    switch (container) {
      case containersId.queue:
        return queueTasks;
      case containersId.inProgress:
        return inProgressTasks;
      case containersId.completed:
        return completedTasks;
      default:
        return [];
    }
  }

  // The function for update the tasks in the definite container
  function setTasksByContainer(container: string, tasks: TaskType[]) {
    switch (container) {
      case containersId.queue:
        setQueueTasks(tasks);
        break;
      case containersId.inProgress:
        setInProgressTasks(tasks);
        break;
      case containersId.completed:
        setCompletedTasks(tasks);
        break;
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const taskInfo = findTaskById(event.active.id as string);
    if (taskInfo) {
      setActiveTask(taskInfo.task);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTaskInfo = findTaskById(activeId);
    if (!activeTaskInfo) return;

    //if drag over the container
    let targetContainer: string;
    if (Object.values(containersId).includes(overId)) {
      targetContainer = overId;
    } else {
      //if drag over the task - find its container
      const overTaskInfo = findTaskById(overId);
      if (!overTaskInfo) return;
      targetContainer = overTaskInfo.container;
    }

    const activeContainer = activeTaskInfo.container;
    if (activeContainer === targetContainer) return;

    // Move the task between the containers
    const activeContainerTasks = getTasksByContainer(activeContainer);
    const targetContainerTasks = getTasksByContainer(targetContainer);

    const activeIndex = activeContainerTasks.findIndex((t) => t.id === activeId);
    if (activeIndex === -1) return;

    //Delete the task from active container
    const newActiveContainerTasks = activeContainerTasks.filter((t) => t.id !== activeId);
    setTasksByContainer(activeContainer, newActiveContainerTasks);

    //Add the task to target container
    let insertIndex = targetContainerTasks.length;

    // If move over the concrete task, insert before it
    if (!Object.values(containersId).includes(overId)) {
      const overIndex = targetContainerTasks.findIndex((t) => t.id === overId);
      if (overIndex !== -1) {
        insertIndex = overIndex;
      }
    }

    const newTargetContainerTasks = [...targetContainerTasks];
    newTargetContainerTasks.splice(insertIndex, 0, activeTaskInfo.task);
    setTasksByContainer(targetContainer, newTargetContainerTasks);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTaskInfo = findTaskById(activeId);
    if (!activeTaskInfo) return;

    if (Object.values(containersId).includes(overId)) return;

    // If we move over the task in the same container, change the order
    const overTaskInfo = findTaskById(overId);
    if (!overTaskInfo || activeTaskInfo.container !== overTaskInfo.container) return;

    const container = activeTaskInfo.container;
    const containerTasks = getTasksByContainer(container);

    const activeIndex = containerTasks.findIndex((t) => t.id === activeId);
    const overIndex = containerTasks.findIndex((t) => t.id === overId);

    if (activeIndex !== -1 && overIndex !== -1) {
      const newTasks = arrayMove(containerTasks, activeIndex, overIndex);
      setTasksByContainer(container, newTasks);
    }
  }

  function handleDragCancel() {
    setActiveTask(null);
  }

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
