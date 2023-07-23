export interface Task {
  id: string;
  name: string;
  color: string;
  isTimerRunning: boolean;
  duration: number;
}

export interface SessionSnapshot {
  session: Task[] | null;
}
