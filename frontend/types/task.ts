export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  priority: Priority;
  createdAt: number;
}

export type FilterType = 'All' | 'Active' | 'Completed';
export type SortType = 'Date' | 'Priority';

