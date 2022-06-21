export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  created: string;
}

export enum TaskStatus {
  INCOMPLETE = 'INCOMPLETE',
  DONE = 'DONE',
}
