import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskTitleDto } from './dto/update-task-title.dto';
import { TasksDao } from './tasks.dao';

@Injectable()
export class TasksService {
  constructor(private readonly tasksDao: TasksDao) {}

  async getTaskById(taskId: string): Promise<Task> {
    const task = await this.tasksDao.getTaskById(taskId);

    if (!task) {
      throw new NotFoundException(`Task with ID '${taskId}' no found`);
    }

    return task;
  }

  async deleteTaskById(taskId: string): Promise<Task> {
    const task = await this.tasksDao.getTaskById(taskId);

    if (!task) {
      throw new NotFoundException(`Task with ID '${taskId}' no found`);
    }

    if (task.status !== TaskStatus.DONE) {
      throw new BadRequestException(`Task with ID '${taskId}' can't be deleted because its not in DONE status`);
    }

    return this.tasksDao.deleteTaskById(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasksDao.getAllTasks();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksDao.createTask(createTaskDto);
  }

  async updateTaskStatusById(taskId: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const task = await this.tasksDao.getTaskById(taskId);

    if (!task) {
      throw new NotFoundException(`Task with ID '${taskId}' no found`);
    }

    if (task.status !== TaskStatus.INCOMPLETE) {
      throw new BadRequestException(`Task with ID '${taskId}' can't be updated because its not in INCOMPLETE status`);
    }

    return this.tasksDao.updateTaskStatus(task, updateTaskStatusDto.status);
  }

  async updateTaskTitleById(taskId: string, updateTaskTitleDto: UpdateTaskTitleDto): Promise<Task> {
    const task = await this.tasksDao.getTaskById(taskId);

    if (!task) {
      throw new NotFoundException(`Task with ID '${taskId}' no found`);
    }

    if (task.status !== TaskStatus.INCOMPLETE) {
      throw new BadRequestException(`Task with ID '${taskId}' can't be updated because its not in INCOMPLETE status`);
    }

    return this.tasksDao.updateTaskTitle(task, updateTaskTitleDto.title);
  }
}
