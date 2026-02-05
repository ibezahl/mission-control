export type KanbanColumn = 
  | 'top_priorities'
  | 'job_search_pipe'
  | 'intelligence_monitoring'
  | 'tonights_mission'
  | 'family_personal'
  | 'done';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  board_column: KanbanColumn;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}
