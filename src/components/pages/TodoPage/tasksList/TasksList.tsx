import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { TaskItem } from './TaskItem.tsx';
import { EditTaskForm } from './EditTaskForm.tsx';
import { TaskFormValues } from '../addTaskForm/AddTaskForm.tsx';

type PropsType = {
  tasks: TaskType[];
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedData: TaskUpdateData) => void;
  toggleCompletingOfTask: (id: string, isCompleted: boolean) => void;
};
export type TaskType = {
  id: string;
  userId: string;
  deadline?: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  category: string;
};

//todo fix spelling TaksNoIdType----------
export type TaksNoIdType = Omit<TaskType, 'id'>;
export type TaskUpdateData = Partial<Omit<TaskType, 'id' | 'userId'>>;

export const TasksList: React.FC<PropsType> = React.memo(
  ({ tasks, deleteTask, updateTask, toggleCompletingOfTask }) => {
    
    //todo: check this type--------------1
    const [activeTask, setActiveTask] = useState<TaskType | null | undefined>(tasks[0]);
    const [editTaskMode, setEditTaskMode] = useState<{
      active: boolean;
      editedTask: TaskType | null;
    }>({
      active: false,
      editedTask: null,
    });

    const prevListLength = useRef<number>(tasks.length);
    const lastTaskElementAnchor = useRef<HTMLDivElement>(null);

    // todo: check this feature------------
    useEffect(() => {
      if (tasks.length > prevListLength.current) {
        lastTaskElementAnchor.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, [tasks]);

    //todo: check necesserity of this code
    useEffect(() => {
      setActiveTask(null);
    }, []);

    const onTaskClick = (id: string): void => {
      //todo: check types -----------1
      const currentTask: TaskType | undefined = tasks.find((task) => task.id === id);
      if (currentTask) {
        setActiveTask(currentTask);
      }
    };

    const onEditClick: (task: TaskType) => void = (task) => {
      if (editTaskMode.active) return;
      setEditTaskMode({ active: true, editedTask: task });
    };

    const closeForm: () => void = () => {
      setEditTaskMode({ active: false, editedTask: null });
    };

    const changeTask = (data: TaskFormValues) => {
      const taskId = editTaskMode.editedTask!.id;
      updateTask(taskId, { ...data });
    };

    const onEditFormSubmit = (data: TaskFormValues) => {
      changeTask(data);
      setActiveTask(editTaskMode.editedTask);
      closeForm();
    };

    const onDeleteTask = (id: string) => {
      deleteTask(id);
    };

    return (
      <div className="grid grid-cols-12 gap-4 h-full w-full p-4">
        {/* Task List */}
        <div className="col-span-6  dark:bg-gray-800 rounded-xl shadow-lg p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
            List of Tasks
          </h2>
          {tasks.length === 0 && (
            <h3 className="text-amber-500 text-center">The list is empty, add new task.</h3>
          )}
          <div className="space-y-2">
            {tasks.map((task, index) => {
              const isActive = task.id === activeTask?.id;
              const isLast = index === tasks.length - 1;

              return (
                <div
                  key={task.id}
                  className={`${isActive ? 'bg-amber-700/80' : 'hover:bg-gray-700/50 dark:hover:bg-gray-700 cursor-pointer'} border border-gray-300 dark:border-gray-700 rounded-md px-3 `}
                  onClick={() => onTaskClick(task.id)}
                  ref={isLast ? lastTaskElementAnchor : null}
                >
                  <TaskItem
                    task={task}
                    deleteTask={onDeleteTask}
                    onEditTask={onEditClick}
                    toggleCompletingOfTask={toggleCompletingOfTask}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Description or edit form */}
        {editTaskMode.active ? (
          <div className="col-span-6 dark:bg-gray-800 rounded-xl shadow-lg p-4 overflow-y-auto">
            <EditTaskForm
              closeForm={closeForm}
              onSubmit={onEditFormSubmit}
              editedTask={editTaskMode.editedTask as TaskType}
            />
          </div>
        ) : (
          <div className="col-span-6 dark:bg-gray-800 rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
              Description
            </h2>
            <p
              className={`${activeTask?.description ? 'text-white dark: text-gray-700 whitespace-pre-wrap' : 'text-cyan-700 text-shadow-lg/40 italic'}`}
            >
              {activeTask?.description || 'There is no description...'}
            </p>
          </div>
        )}
      </div>
    );
  },
);

