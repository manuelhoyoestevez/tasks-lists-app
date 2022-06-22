import axios from 'axios';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { url } from '../back-url';

const DONE = 'DONE';
const INCOMPLETE = 'INCOMPLETE';

type Task = {
  id: string,
  title: string,
  status: string,
  created: string,
};

type Response = {
  status: number,
  data: object
};

const request = (method: string, path: string, body: any): Promise<Response> => {
  const options = {
      method,
      url: `${url}/${path}`,
      headers: { 'content-type': 'application/json' },
      data: body ? JSON.stringify(body) : ''
  };

  return axios(options);
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  taskTitle = '';
  tasks: Task[] = [];

  ngOnInit() {
    this.reloadTasks();
  }

  getCompletedTasks(): Task [] {
    return this.tasks
    .filter(task => task.status === DONE)
    .sort((a, b) => b.created.localeCompare(a.created));
  }

  getIncompletedTasks() {
    return this.tasks
    .filter(task => task.status === INCOMPLETE)
    .sort((a, b) => b.created.localeCompare(a.created));
  }

  onCreate = async (ngForm: NgForm) => {
    if (this.taskTitle === '') {
      alert('Task title is empty')
      return false;
    }
    await this.createTask(this.taskTitle);
    this.taskTitle = '';
    return false;
  }

  onEdit = async (ngForm: NgForm, task: Task) => {
    if (task.title === '') {
      alert('Task title is empty')
      await this.reloadTasks();
      return false;
    }
    await this.editTask(task.id, task.title);
    return false;
  }

  onDone = async (ngForm: NgForm, task: Task) => {
    await this.completeTask(task.id);
    return false;
  }

  onDelete = async (ngForm: NgForm, task: Task) => {
    await this.deleteTask(task.id);
    return false;
  }

  async reloadTasks() {
    const { data }: Response = await request('get', 'tasks', {});
    this.tasks = data as Task[];
  }

  async createTask(taskTitle: string) {
    await request('post', 'tasks', { title: taskTitle });
    await this.reloadTasks();
  }

  async editTask(taskId: string, title: string) {
    await request('patch', `tasks/${taskId}/set-title`, { title });
    await this.reloadTasks();
  }

  async completeTask(taskId: string) {
    await request('patch', `tasks/${taskId}/set-done`, { status: DONE });
    await this.reloadTasks();
  }

  async deleteTask(taskId: string) {
    await request('delete', `tasks/${taskId}`, {});
    await this.reloadTasks();
  }
}
