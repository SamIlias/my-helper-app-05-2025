import * as React from 'react';
import { TaskFormValues } from '../model/types';
type PropsType = {
    title: string;
    closeAddForm: () => void;
    onSubmit: (data: TaskFormValues) => void;
    submitButtonText: string;
    defaultValues?: TaskFormValues;
};
export declare const BaseTaskForm: React.FC<PropsType>;
export {};
