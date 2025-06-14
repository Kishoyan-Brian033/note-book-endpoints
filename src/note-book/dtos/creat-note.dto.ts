import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  content: string;
}
