import { Module } from '@nestjs/common';
import { NoteBookService } from './note-book.service';
import { NoteBookController } from './note-book.controller';
import { DatabaseService } from 'src/database/connection.service';

@Module({
  providers: [NoteBookService, DatabaseService],
  controllers: [NoteBookController],
})
export class NoteBookModule {}
