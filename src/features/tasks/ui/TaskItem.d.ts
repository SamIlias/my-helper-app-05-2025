import * as React from 'react';
import { TaskType } from '../model/types';
export declare const TaskItem: React.FC<IProps>;
interface IProps {
    task: TaskType;
    deleteTask: (id: string) => void;
    onEditTask: (task: TaskType) => void;
    toggleCompletingOfTask: (id: string, isCompleted: boolean) => void;
}
export {};
