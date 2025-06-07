import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  TaskWithoutId,
  TaskType,
  TaskUpdateData,
} from '../components/pages/TodoPage/tasksList/TasksList.tsx';

export const addTask = async (task: TaskWithoutId) => {
  try {
    await addDoc(collection(db, 'tasks'), task);
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const getTasks = async (userId: string): Promise<TaskType[]> => {
  const q = query(collection(db, 'tasks'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  const tasks: TaskType[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as TaskType;
    tasks.push({
      id: doc.id,
      userId: data.userId,
      title: data.title,
      deadline: data.deadline,
      isCompleted: data.isCompleted,
      description: data.description,
      category: data.category,
    });
  });

  return tasks;
};

export const updateTaskById = async (taskId: string, updatedData: TaskUpdateData) => {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, updatedData);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTaskById = async (taskId: string) => {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
