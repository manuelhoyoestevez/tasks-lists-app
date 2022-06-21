import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksMysqlDao } from './tasks.mysql-dao';

@Module({
  providers: [TasksService, TasksMysqlDao],
  controllers: [TasksController],
})
export class TasksModule {}
