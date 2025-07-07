type TaskType = {
    id: string;
    userId: string;
    deadline?: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    category: TaskCategoryKey;
};
type TaskWithoutId = Omit<TaskType, 'id'>;
type TaskUpdateData = Partial<Omit<TaskType, 'id' | 'userId'>>;
type TaskFormValues = Pick<TaskType, 'title' | 'deadline' | 'category' | 'description'>;
declare const taskCategories: {
    readonly Default: "default";
    readonly Work: "work";
    readonly Daily: "daily";
    readonly Urgent: "urgent";
    readonly Shopping: "shopping";
};
type TaskCategoryKey = keyof typeof taskCategories;
declare const categoryColor: {
    readonly work: "text-amber-800 dark:text-amber-300";
    readonly default: "text-lime-700 dark:text-lime-300";
    readonly urgent: "text-red-500 dark:text-red-400";
    readonly daily: "text-cyan-600";
    readonly shopping: "text-violet-500";
};
type TaskCategoryValue = keyof typeof categoryColor;
export type { TaskType, TaskWithoutId, TaskUpdateData, TaskFormValues, TaskCategoryKey, TaskCategoryValue, };
export { categoryColor, taskCategories };
