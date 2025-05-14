import axios, { AxiosResponse } from 'axios';
import { TaskType } from '../components/pages/TodoPage/TasksList.tsx';

const masterKey = '$2a$10$6uI7t0Nh.1vRh4VfQdMjY.gCeSWN1si8AT2UwTkfK4bGqcKPC.i0i';
const binId = '6824f7498a456b79669dd26a';

export const getTasks = async (): Promise<TaskType[]> => {
  try {
    const response: AxiosResponse = await axios.get<JsonBinResponse<TaskType[]>>(
      `https://api.jsonbin.io/v3/b/${binId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': masterKey,
        },
      },
    );

    return response.data.record;
  } catch (error) {
    console.warn(error);
    return [];
  }
};

type JsonBinResponse<T> = {
  record: T;
  metadata: unknown;
};
