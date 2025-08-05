import {
  defaultDropAnimationSideEffects,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { TaskType } from '@/features/tasks';
import { TaskStatus } from '@/features/tasks/model/types';
import { useEffect, useState } from 'react';

type ContainerIdType = { [key: string]: TaskStatus };
export const containersId: ContainerIdType = {
  queue: 'queue',
  inProgress: 'inProgress',
  completed: 'completed',
};

export const useDnD = (
  tasks: TaskType[],
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>,
) => {
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [originalContainer, setOriginalContainer] = useState<TaskStatus | null>(null);
  const [queueTasks, setQueueTasks] = useState<TaskType[]>(
    tasks.filter((t) => t.status === containersId.queue),
  );
  const [inProgressTasks, setInProgressTasks] = useState<TaskType[]>(
    tasks.filter((t) => t.status === containersId.inProgress),
  );
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>(
    tasks.filter((t) => t.status === containersId.completed),
  );

  useEffect(() => {
    setQueueTasks(tasks.filter((t) => t.status === containersId.queue));
    setInProgressTasks(tasks.filter((t) => t.status === containersId.inProgress));
    setCompletedTasks(tasks.filter((t) => t.status === containersId.completed));
  }, [tasks]);

  const sensors = useSensors(
    // useSensor(PointerSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
      eventOptions: {
        preventDefault: true,
      },
    }),
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
  function findTaskById(id: string): { task: TaskType; container: TaskStatus } | null {
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
      setOriginalContainer(taskInfo.container); // Сохраняем исходный контейнер
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
    if (Object.values(containersId).includes(overId as TaskStatus)) {
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
    if (!Object.values(containersId).includes(overId as TaskStatus)) {
      const overIndex = targetContainerTasks.findIndex((t) => t.id === overId);
      if (overIndex !== -1) {
        insertIndex = overIndex;
      }
    }

    const newTargetContainerTasks = [...targetContainerTasks];
    newTargetContainerTasks.splice(insertIndex, 0, activeTaskInfo.task);
    setTasksByContainer(targetContainer, newTargetContainerTasks);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    const activeId = active.id as string;
    const currentTaskInfo = findTaskById(activeId);

    // clear the state
    setActiveTask(null);
    const originalContainerValue = originalContainer;
    setOriginalContainer(null);

    if (!over || !currentTaskInfo || !originalContainerValue) return;

    const overId = over.id as string;

    let targetContainer: TaskStatus;

    if (Object.values(containersId).includes(overId as TaskStatus)) {
      targetContainer = overId as TaskStatus;
    } else {
      const overTaskInfo = findTaskById(overId);
      if (!overTaskInfo) return;
      targetContainer = overTaskInfo.container;
    }

    if (originalContainerValue !== targetContainer) {
      try {
        await updateTaskStatus(activeId, targetContainer);
      } catch (error) {
        console.error('Failed to update task status:', error);
        // in the case of error - return the task to originalContainer
        const targetTasks = getTasksByContainer(targetContainer);
        const originalTasks = getTasksByContainer(originalContainerValue);

        const updatedTargetTasks = targetTasks.filter((t) => t.id !== activeId);
        setTasksByContainer(targetContainer, updatedTargetTasks);

        const updatedOriginalTasks = [...originalTasks, currentTaskInfo.task];
        setTasksByContainer(originalContainerValue, updatedOriginalTasks);
      }
      return;
    }

    // If we drag inside the same container, we change the order.
    if (!Object.values(containersId).includes(overId as TaskStatus)) {
      const containerTasks = getTasksByContainer(targetContainer);
      const activeIndex = containerTasks.findIndex((t) => t.id === activeId);
      const overIndex = containerTasks.findIndex((t) => t.id === overId);

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        const newTasks = arrayMove(containerTasks, activeIndex, overIndex);
        setTasksByContainer(targetContainer, newTasks);
      }
    }
  }

  function handleDragCancel() {
    setActiveTask(null);
    setOriginalContainer(null);
  }

  return {
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
  };
};
