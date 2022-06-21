import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksDao } from './tasks.dao';

@Module({
  providers: [TasksService, TasksDao],
  controllers: [TasksController],
})
export class TasksModule {}
