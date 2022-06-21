export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  created: Date;
}

export enum TaskStatus {
  INCOMPLETE = 'INCOMPLETE',
  DONE = 'DONE',
}
