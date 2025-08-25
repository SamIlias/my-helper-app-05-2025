import { deleteTaskThunk } from '@/features/tasks/model/tasksThunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';

export const useTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const onDeleteTask = (id: string) => {
    dispatch(deleteTaskThunk(id));
  };

  return {
    onDeleteTask,
  };
};
