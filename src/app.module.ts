import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { NoteBookModule } from './note-book/note-book.module';

@Module({
  imports: [BooksModule, NoteBookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
