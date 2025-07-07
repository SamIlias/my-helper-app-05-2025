import * as React from 'react';
import { TaskFormValues, TaskType } from '../model/types';
type PropsType = {
    closeForm: () => void;
    onSubmit: (data: TaskFormValues) => void;
    editedTask: TaskType;
};
export declare const EditTaskForm: React.FC<PropsType>;
export {};
