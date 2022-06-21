import { TaskStatus } from '../tasks.model';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({ required: true })
  status: TaskStatus;
}
