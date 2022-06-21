import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksDao {
  private tasks: Task[] = [];

  async getTaskById(taskId: string): Promise<Task> {
    return this.tasks.find(({ id }) => id === taskId);
  }

  async createTask(task): Promise<Task> {
    this.tasks.push({
      ...task,
      id: uuid(),
      created: new Date().toDateString(),
      status: TaskStatus.INCOMPLETE,
    });
    return task;
  }

  async updateTaskTitle(task: Task, title: string): Promise<Task> {
    task.title = title;
    return task;
  }

  async updateTaskStatus(task: Task, status: TaskStatus): Promise<Task> {
    task.status = status;
    return task;
  }

  async deleteTaskById(task: Task): Promise<Task> {
    const index = this.tasks.indexOf(task);

    this.tasks.splice(index, 1);

    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }
}
