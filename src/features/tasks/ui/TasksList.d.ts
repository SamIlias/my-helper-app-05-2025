import * as React from 'react';
import { TaskType } from '../model/types';
export type TaskListProps = {
    tasks: TaskType[];
    toggleCompletingOfTask: (id: string, isCompleted: boolean) => void;
};
export declare const TasksList: React.FC<TaskListProps>;
