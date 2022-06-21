import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskTitleDto {
  @ApiProperty({ required: true })
  title: string;
}
