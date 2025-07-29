import * as React from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
} from '@dnd-kit/core';
import { TaskItem } from './TaskItem';
import { EditTaskForm } from './EditTaskForm';
import { useTranslation } from 'react-i18next';
import { TaskStatus, TaskType } from '../model/types';
import { useList } from '../model/useList';
import { borderColors, textColors } from '@/shared/myStyles/myStyles';
import { Description } from './Description';
import { TaskColumn } from './TaskColumn';

export type TaskListProps = {
  tasks: TaskType[];
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
};

export const TasksList: React.FC<TaskListProps> = ({ tasks, updateTaskStatus }) => {
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
    queueTasks,
    inProgressTasks,
    completedTasks,
    setActiveTaskId,
  } = useList(tasks);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const task = tasks.find((t) => t.id === active.id);
    if (!over || task?.status === over.id) return;

    const newStatus = over.id as TaskStatus;
    const taskId = active.id as string;

    updateTaskStatus(taskId, newStatus);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const id = active.id as string;
    setActiveTaskId(id);
    onTaskClick(id);
  };

  const activeTask: TaskType | undefined = tasks.find((task) => task.id === activeTaskId);

  const { t } = useTranslation('todopage');

  return (
    <div className="flex h-full w-full">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <div className="flex justify-stretch h-full w-full gap-4">
          <TaskColumn
            id="queue"
            title="Task queue"
            tasks={queueTasks}
            onEditTask={onEditClick}
            deleteTask={onDeleteTask}
          />
          <TaskColumn
            id="in-progress"
            title="Tasks in progress"
            tasks={inProgressTasks}
            onEditTask={onEditClick}
            deleteTask={onDeleteTask}
          />
          <TaskColumn
            id="completed"
            title="Completed tasks"
            tasks={completedTasks}
            onEditTask={onEditClick}
            deleteTask={onDeleteTask}
          />
        </div>
      </DndContext>
    </div>
  );
};
{/*<div*/}
{/*  className={`border ${borderColors.primary} h-full rounded p-2 overflow-y-auto shadow-md`}*/}
{/*>*/}
{/*  <h2 className={`${textColors.main} text-xl font-semibold text-center mb-4`}>*/}
{/*    /!*{t('tasksList.listTitle')}*!/*/}
{/*    Task queue*/}
{/*  </h2>*/}

{/*  {tasks.length === 0 && (*/}
{/*    <h3 className={`${textColors.highlight} text-center`}>*/}
{/*      {t('tasksList.emptyListMessage')}*/}
{/*    </h3>*/}
{/*  )}*/}

{/*  <div className="space-y-2">*/}
{/*    {tasks.map((task) => {*/}
{/*      const isActive = task.id === activeTaskId;*/}
{/*      const isNew = task.id === newAddedTask?.id;*/}

{/*      return (*/}
{/*        <div*/}
{/*          key={task.id}*/}
{/*          className={`${isActive ? 'bg-amber-500/80 dark:bg-orange-500/50' : 'hover:bg-stone-900/10 dark:hover:bg-stone-500/90 cursor-pointer'} border ${borderColors.primary}  rounded px-3`}*/}
{/*          onClick={() => onTaskClick(task.id)}*/}
{/*          ref={isNew ? newTaskElementAnchor : null}*/}
{/*        >*/}
{/*          <TaskItem*/}
{/*            task={task}*/}
{/*            deleteTask={onDeleteTask}*/}
{/*            onEditTask={onEditClick}*/}
{/*            toggleCompletingOfTask={toggleCompletingOfTask}*/}
{/*          />*/}
{/*        </div>*/}
{/*      );*/}
{/*    })}*/}
{/*  </div>*/}
{/*</div>*/}

{/*<div*/}
{/*  className={`border ${borderColors.primary} h-full rounded p-2 overflow-y-auto shadow-md`}*/}
{/*>*/}
{/*  <h2 className={`${textColors.main} text-xl font-semibold text-center mb-4`}>*/}
{/*    /!*{t('tasksList.listTitle')}*!/*/}
{/*    Tasks in progress*/}
{/*  </h2>*/}
{/*</div>*/}

{/*<div*/}
{/*  className={`border ${borderColors.primary} h-full rounded p-2 overflow-y-auto shadow-md`}*/}
{/*>*/}
{/*  <h2 className={`${textColors.main} text-xl font-semibold text-center mb-4`}>*/}
{/*    /!*{t('tasksList.listTitle')}*!/*/}
{/*    Completed tasks*/}
{/*  </h2>*/}
{/*</div>*/}
{/* DescriptionAndEditFormBlock */}
{/*<div*/}
{/*  className={`*/}
{/*    ${*/}
{/*      isShowDescriptionBlockOnMobile*/}
{/*        ? 'absolute inset-0 z-10 bg-stone-100/95 dark:bg-stone-600/95'*/}
{/*        : isMobile*/}
{/*          ? 'hidden'*/}
{/*          : 'block'*/}
{/*    }*/}
{/*     rounded pb-1*/}
{/*  `}*/}
{/*>*/}
{/*  {editTaskMode.active ? (*/}
{/*    <EditTaskForm*/}
{/*      closeForm={closeEditForm}*/}
{/*      onSubmit={onEditFormSubmit}*/}
{/*      editedTask={editTaskMode.editedTask as TaskType}*/}
{/*    />*/}
{/*  ) : (*/}
{/*    <Description*/}
{/*      description={activeTask?.description}*/}
{/*      isMobile={isMobile}*/}
{/*      onCloseDescription={closeDescriptionOnMobile}*/}
{/*    />*/}
{/*  )}*/}
{/*</div>*/}
