import { join } from 'path';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
