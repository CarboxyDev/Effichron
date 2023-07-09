export interface Task {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  duration: number;
}

export interface SessionSnapshot {
  session: Task[] | null;
}
