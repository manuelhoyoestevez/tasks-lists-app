import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskTitleDto } from './dto/update-task-title.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterTaskDto } from './dto/filter-task.dto';

@ApiTags('Tasks')
@Controller('/api/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const user = this.tasksService.getTaskById(id);
    if (!user) {
      throw new NotFoundException(`User ith ID '${id}' not found`);
    }
    return user;
  }

  @Patch('/:id/set-title')
  async updateTaskTitleById(@Param('id') id: string, @Body() updateTaskTitleDto: UpdateTaskTitleDto): Promise<Task> {
    const user = this.tasksService.updateTaskTitleById(id, updateTaskTitleDto);
    if (!user) {
      throw new NotFoundException(`User ith ID '${id}' not found`);
    }
    return user;
  }

  @Patch('/:id/set-done')
  async updateTaskStatusById(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskStatusDto): Promise<Task> {
    const user = this.tasksService.updateTaskStatusById(id, updateTaskDto);
    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }
    return user;
  }

  @Get()
  async getAllTasks(@Query() query: FilterTaskDto): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id): Promise<Task> {
    const user = this.tasksService.deleteTaskById(id);
    if (!user) {
      throw new NotFoundException(`User ith ID '${id}' not found`);
    }
    return user;
  }
}
