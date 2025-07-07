import * as React from 'react';
import { TaskFormValues } from '../model/types';
export declare const AddTaskForm: React.FC<PropsType>;
type PropsType = {
    closeAddForm: () => void;
    onSubmit: (data: TaskFormValues) => void;
};
export {};
