import axios from 'axios';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

const url = '/api';
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
      data: '',
      headers: {
          'content-type': 'application/json'
      }
  };

  if (body) {
      options.data = JSON.stringify(body);
  }

  return new Promise((resolve, reject) => {
      axios(options)
          .then(({ status, data }) => resolve({ status, data }))
          .catch((err) => err.response ? resolve({ status: err.response.status, data: err.response.data }) : reject(err))
  });
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
    this.createTask(this.taskTitle);
    return false;
  }

  onEdit = async (ngForm: NgForm, task: Task, index: number) => {
    await this.editTask(task.id, task.title);
    return false;
  }

  onDone = async (ngForm: NgForm, task: Task, index: number) => {
    await this.completeTask(task.id);
    return false;
  }

  onDelete = async (ngForm: NgForm, task: Task, index: number) => {
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
