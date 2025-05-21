import axios, { AxiosResponse } from 'axios';
import { TaskType } from '../components/pages/TodoPage/tasksList/TasksList.tsx';

const baseUrl = 'https://api.jsonbin.io/v3/b/';
const masterKey = '$2a$10$6uI7t0Nh.1vRh4VfQdMjY.gCeSWN1si8AT2UwTkfK4bGqcKPC.i0i';
const binId = '682648a48a456b79669e7978';

export const getTasks = async (): Promise<TaskType[]> => {
  try {
    const response: AxiosResponse = await axios.get<JsonBinResponse<TaskType[]>>(
      `${baseUrl}${binId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': masterKey,
        },
      },
    );

    return response.data.record;
  } catch (error) {
    //todo handle error
    console.error(error);
    return [];
  }
};

export const putTasks = async (updatedTasks: TaskType[]): Promise<TaskType[] | undefined> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${baseUrl}${binId}`,
      JSON.stringify(updatedTasks),
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': masterKey,
        },
      },
    );

    return response.data.record;
  } catch (error) {
    //todo handle error
    console.error(error);
  }
};

type JsonBinResponse<T> = {
  record: T;
  metadata: unknown;
};
