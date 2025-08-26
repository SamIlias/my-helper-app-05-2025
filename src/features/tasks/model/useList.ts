// import { useEffect, useRef } from 'react';
// import { TaskType } from './types';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/app/store';
// import { setNewAddedTask } from './tasksSlice';
//
// // function isTaskInList(taskId: string | null | undefined, taskList: TaskType[]): boolean {
// //   if (!taskId) return false;
// //   return taskList.some((t) => t.id === taskId);
// // }
//
// export const useList = (tasks: TaskType[]) => {
//   const { newAddedTask } = useSelector((state: RootState) => state.tasks);
//   const dispatch = useDispatch<AppDispatch>();
//
//   // const isMobile = useIsMobile();
//
//   const newTaskElementAnchor = useRef<HTMLDivElement>(null);
//
//   useEffect(() => {
//     newTaskElementAnchor.current?.scrollIntoView({ behavior: 'smooth' });
//     dispatch(setNewAddedTask(null));
//   }, [tasks, dispatch]);
//
//
//   return {
//     newAddedTask,
//     newTaskElementAnchor,
//   };
// };
