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
  getTaskById(@Param('id') id: string): Task {
    const user = this.tasksService.getTaskById(id);
    if (!user) {
      throw new NotFoundException(`User ith ID '${id}' not found`);
    }
    return user;
  }

  @Patch('/:id/set-title')
  updateTaskTitleById(@Param('id') id: string, @Body() updateTaskTitleDto: UpdateTaskTitleDto): Task {
    const user = this.tasksService.updateTaskTitleById(id, updateTaskTitleDto);
    if (!user) {
      throw new NotFoundException(`User ith ID '${id}' not found`);
    }
    return user;
  }

  @Patch('/:id/set-done')
  updateTaskStatusById(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskStatusDto): Task {
    const user = this.tasksService.updateTaskStatusById(id, updateTaskDto);
    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }
    return user;
  }

  @Get()
  getAllTasks(@Query() query: FilterTaskDto): Task[] {
    return this.tasksService.getAllTasks(query);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id): Task {
    const user = this.tasksService.deleteTaskById(id);
    if (!user) {
      throw new NotFoundException(`User ith ID '${id}' not found`);
    }
    return user;
  }
}
