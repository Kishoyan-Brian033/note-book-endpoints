import { Module } from '@nestjs/common';
import { NoteBookService } from './note-book.service';
import { NoteBookController } from './note-book.controller';

@Module({
  providers: [NoteBookService],
  controllers: [NoteBookController]
})
export class NoteBookModule {}
