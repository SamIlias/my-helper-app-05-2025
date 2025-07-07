import { TaskWithoutId, TaskType, TaskUpdateData } from '@/features/tasks';
declare const addTask: (task: TaskWithoutId) => Promise<void>;
declare const getTasks: (userId: string) => Promise<TaskType[]>;
declare const updateTaskById: (taskId: string, updatedData: TaskUpdateData) => Promise<void>;
declare const deleteTaskById: (taskId: string) => Promise<void>;
export { addTask, getTasks, updateTaskById, deleteTaskById };
