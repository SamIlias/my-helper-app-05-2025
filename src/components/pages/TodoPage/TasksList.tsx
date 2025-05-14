import { useState } from 'react';
import * as React from 'react';

export const TasksList: React.FC<PropsType> = ({ tasks }) => {
  const [description, setDescription] = useState(tasks[0]?.description);

  const onTaskClick = (id: number): void => {
    const currentTask: TaskType | undefined = tasks.find((task) => task.id === id);
    if (currentTask) {
      setDescription(currentTask.description);
    }
  };

  return (
    <div className="grid grid-cols-14 grid-rows-6 h-full w-full">
      <div className="border col-span-7 col-start-1 row-span-6">
        <h2 className="text-center">list of tasks</h2>
        {tasks.map((task) => (
          <div className="border m-3" onClick={() => onTaskClick(task.id)}>
            <button>O</button>
            <span>{task.deadline}</span>
            <span className="m-3">{task.title}</span>
            <button>(-)</button>
          </div>
        ))}
      </div>

      <div className="border col-span-7 col-start-8 row-span-6">
        <h2>Description</h2>
        <p>{description ? description : 'No description available.'}</p>
      </div>
    </div>
  );
};

type PropsType = {
  tasks: TaskType[];
};

export type TaskType = {
  id: number;
  deadline?: string;
  title: string;
  description?: string;
};
