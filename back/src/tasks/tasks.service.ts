import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskTitleDto } from './dto/update-task-title.dto';

const booleanToTaskStatus = (done: boolean): TaskStatus =>
  typeof done !== 'boolean' ? null : done ? TaskStatus.DONE : TaskStatus.INCOMPLETE;

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTaskById(taskId: string): Task | undefined {
    return this.tasks.find(({ id }) => id === taskId);
  }

  deleteTaskById(id: string): Task {
    const task = this.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID '${id}' no found`);
    }

    if (task.status !== TaskStatus.DONE) {
      throw new BadRequestException(`Task with ID '${id}' can't be deleted because its not in DONE status`);
    }

    const index = this.tasks.indexOf(task);

    this.tasks.splice(index, 1);

    return task;
  }

  getAllTasks(query: FilterTaskDto): Task[] {
    let tasks = this.tasks;

    if (typeof query.done === 'boolean') {
      tasks = this.tasks.filter((task: Task) => task.status === booleanToTaskStatus(query.done));
    }

    if (typeof query.title === 'string') {
      tasks = this.tasks.filter((task: Task) => task.title.includes(query.title));
    }

    return tasks;
  }

  createTask({ title }: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title,
      status: TaskStatus.INCOMPLETE,
      created: new Date(),
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatusById(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const task = this.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID '${id}' no found`);
    }

    task.status = updateTaskStatusDto.status;

    return task;
  }

  updateTaskTitleById(id: string, updateTaskTitleDto: UpdateTaskTitleDto): Task {
    const task = this.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID '${id}' no found`);
    }

    if (task.status !== TaskStatus.INCOMPLETE) {
      throw new BadRequestException(`Task with ID '${id}' can't be updated because its not in INCOMPLETE status`);
    }

    task.title = updateTaskTitleDto.title;

    return task;
  }
}
