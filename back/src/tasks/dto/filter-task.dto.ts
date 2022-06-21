import { MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTaskDto {
  @ApiProperty({
    description: 'Title',
    required: false,
  })
  @MinLength(2)
  title: string;

  @ApiProperty({
    description: 'Is done',
    required: false,
  })
  done: boolean;
}
