import { TaskType } from './types';

// 1. Compare by deadline (ascending: earliest first, undefined last)
export const compareByDeadline = (a: TaskType, b: TaskType): number => {
  if (!a.deadline && !b.deadline) return 0;
  if (!a.deadline) return 1; // a goes after b
  if (!b.deadline) return -1; // b goes after a

  const dateA = new Date(a.deadline).getTime();
  const dateB = new Date(b.deadline).getTime();
  return dateA - dateB;
};

// 2. Compare by category (alphabetical by default)
export const compareByCategory = (a: TaskType, b: TaskType): number => {
  if (a.category < b.category) return -1;
  if (a.category > b.category) return 1;
  return 0;
};
