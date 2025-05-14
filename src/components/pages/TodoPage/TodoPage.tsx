import { useEffect, useState } from 'react';
import { AddTaskForm } from './AddTaskForm.tsx';
import { TasksList, TaskType } from './TasksList.tsx';
import axios from 'axios';
import { getTasks } from '../../../api/todoApi.ts';

const TodoPage = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const loadTasks = async () => {
    const tasksResponse = await getTasks();
    setTasks(tasksResponse);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const [isAddFormActive, setIsAddFormActive] = useState(false);

  const onAddTask = () => {
    setIsAddFormActive(true);
  };

  const onCloseAddForm = () => {
    setIsAddFormActive(false);
  };

  return isAddFormActive ? (
    <AddTaskForm onCloseAddForm={onCloseAddForm} />
  ) : (
    <div className="grid grid-cols-14 grid-rows-7 content-center h-full">
      <div className="col-span-14 col-start-1 row-span-1 row-start-1 border">
        <div className="grid grid-cols-14">
          <span className="m-3 text-3xl col-span-3 col-start-1">My tasks</span>
          <button className="m-3 border col-span-2" onClick={onAddTask}>
            Add new
          </button>
          <button className="m-3 border col-span-2">Hide/Show</button>
        </div>
      </div>

      <div className="col-span-14 col-start-1 row-span-6 row-start-2 justify-items-center border h-full">
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
};

export default TodoPage;
