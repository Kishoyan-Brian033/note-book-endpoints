import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { NoteBookModule } from './note-book/note-book.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BooksModule, NoteBookModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
