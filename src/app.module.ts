import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteBookModule } from './note-book/note-book.module';

@Module({
  imports: [NoteBookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
