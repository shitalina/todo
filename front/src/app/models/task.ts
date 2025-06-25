export interface Task {
  id: number;
  user_id: number;
  title: string;
  project_name?: string;
  current_status: 'unstarted' | 'completed' | 'in_progress';
  memo?: string;
}