import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { poolQuery } from '../mysql';

@Injectable()
export class TasksMysqlDao {
  async getTaskById(taskId: string): Promise<Task> {
    const result = await poolQuery(`SELECT * FROM task WHERE id = '${taskId}'`);

    if (result.length <= 0) {
      return;
    }

    const { id, title, status, created } = result[0];

    return { id, title: unescape(title), status, created };
  }

  async createTask(task): Promise<Task> {
    const newId = uuid();
    const sqlInsert = `INSERT INTO task (id, title, status)
          VALUES ('${newId}', '${escape(task.title)}', '${TaskStatus.INCOMPLETE}');`;

    await poolQuery(sqlInsert);

    return this.getTaskById(newId);
  }

  async updateTaskTitle(task: Task, title: string): Promise<Task> {
    const sqlUpdate = `UPDATE task SET title = '${escape(title)}' WHERE id = '${task.id}'`;

    await poolQuery(sqlUpdate);

    return task;
  }

  async updateTaskStatus(task: Task, status: TaskStatus): Promise<Task> {
    const sqlUpdate = `UPDATE task SET status = '${status}' WHERE id = '${task.id}'`;

    await poolQuery(sqlUpdate);

    return task;
  }

  async deleteTaskById(task: Task): Promise<Task> {
    const sqlDelete = `DELETE FROM task WHERE id = '${task.id}'`;

    await poolQuery(sqlDelete);

    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    const result = await poolQuery(`SELECT * FROM task;`);
    return result.map(({ id, title, status, created }) => ({ id, title: unescape(title), status, created }));
  }
}
