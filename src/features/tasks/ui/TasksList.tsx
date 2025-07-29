import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { SortableTaskItem } from '@/features/tasks/ui/SortableTaskItem';
import { TaskType } from '@/features/tasks';

// Компонент для droppable контейнера
const DroppableContainer: React.FC<{
  id: string;
  children: React.ReactNode;
  title: string;
  className?: string;
}> = ({ id, children, title, className = '' }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full flex gap-2 flex-col min-h-32 p-4 rounded-lg transition-colors ${className} ${
        isOver ? 'ring-2 ring-blue-400 bg-blue-50/10' : ''
      }`}
    >
      <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
      {children}
    </div>
  );
};

export const TasksList: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  const [queueTasks, setQueueTasks] = useState<TaskType[]>(tasks);
  const [inProgressTasks, setInProgressTasks] = useState<TaskType[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);
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

  // Функция для поиска задачи по ID во всех контейнерах
  function findTaskById(id: string): { task: TaskType; container: string } | null {
    let task = queueTasks.find((t) => t.id === id);
    if (task) return { task, container: 'queue' };

    task = inProgressTasks.find((t) => t.id === id);
    if (task) return { task, container: 'inProgress' };

    task = completedTasks.find((t) => t.id === id);
    if (task) return { task, container: 'completed' };

    return null;
  }

  // Функция для получения задач по названию контейнера
  function getTasksByContainer(container: string): TaskType[] {
    switch (container) {
      case 'queue':
        return queueTasks;
      case 'inProgress':
        return inProgressTasks;
      case 'completed':
        return completedTasks;
      default:
        return [];
    }
  }

  // Функция для обновления задач в контейнере
  function setTasksByContainer(container: string, tasks: TaskType[]) {
    switch (container) {
      case 'queue':
        setQueueTasks(tasks);
        break;
      case 'inProgress':
        setInProgressTasks(tasks);
        break;
      case 'completed':
        setCompletedTasks(tasks);
        break;
    }
  }

  function handleDragStart(event: DragEndEvent) {
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

    // Найдем активную задачу
    const activeTaskInfo = findTaskById(activeId);
    if (!activeTaskInfo) return;

    // Определим контейнер назначения
    let targetContainer: string;

    // Если перетаскиваем на контейнер
    if (['queue', 'inProgress', 'completed'].includes(overId)) {
      targetContainer = overId;
    } else {
      // Если перетаскиваем на задачу, найдем ее контейнер
      const overTaskInfo = findTaskById(overId);
      if (!overTaskInfo) return;
      targetContainer = overTaskInfo.container;
    }

    const activeContainer = activeTaskInfo.container;

    // Если контейнеры одинаковые, ничего не делаем (обработается в handleDragEnd)
    if (activeContainer === targetContainer) return;

    // Перемещаем задачу между контейнерами
    const activeContainerTasks = getTasksByContainer(activeContainer);
    const targetContainerTasks = getTasksByContainer(targetContainer);

    const activeIndex = activeContainerTasks.findIndex((t) => t.id === activeId);
    if (activeIndex === -1) return;

    // Удаляем из исходного контейнера
    const newActiveContainerTasks = activeContainerTasks.filter((t) => t.id !== activeId);
    setTasksByContainer(activeContainer, newActiveContainerTasks);

    // Добавляем в целевой контейнер
    let insertIndex = targetContainerTasks.length;

    // Если перетаскиваем на конкретную задачу, вставляем перед ней
    if (!['queue', 'inProgress', 'completed'].includes(overId)) {
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

    // Найдем активную задачу
    const activeTaskInfo = findTaskById(activeId);
    if (!activeTaskInfo) return;

    // Если перетаскиваем на контейнер, ничего не делаем (уже обработано в handleDragOver)
    if (['queue', 'inProgress', 'completed'].includes(overId)) return;

    // Если перетаскиваем на задачу в том же контейнере, меняем порядок
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
        {/* Queue Column */}
        <DroppableContainer id="queue" title="Очередь" className="bg-red-800/40">
          <SortableContext
            items={queueTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {queueTasks.length ? (
              queueTasks.map((t) => <SortableTaskItem key={t.id} id={t.id} task={t} />)
            ) : (
              <p className="text-center text-gray-500 py-8">Пусто</p>
            )}
          </SortableContext>
        </DroppableContainer>

        {/* In Progress Column */}
        <DroppableContainer id="inProgress" title="В работе" className="bg-green-700/30">
          <SortableContext
            items={inProgressTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {inProgressTasks.length ? (
              inProgressTasks.map((t) => <SortableTaskItem key={t.id} id={t.id} task={t} />)
            ) : (
              <p className="text-center text-gray-500 py-8">Пусто</p>
            )}
          </SortableContext>
        </DroppableContainer>

        {/* Completed Column */}
        <DroppableContainer id="completed" title="Выполнено" className="bg-amber-700/30">
          <SortableContext
            items={completedTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {completedTasks.length ? (
              completedTasks.map((t) => <SortableTaskItem key={t.id} id={t.id} task={t} />)
            ) : (
              <p className="text-center text-gray-500 py-8">Пусто</p>
            )}
          </SortableContext>
        </DroppableContainer>
      </div>

      {/* Drag Overlay */}
      <DragOverlay dropAnimation={dropAnimation}>
        {activeTask ? <SortableTaskItem id={activeTask.id} task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
