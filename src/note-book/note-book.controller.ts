import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NoteBookService } from './note-book.service';
import { CreateNoteDto } from './dtos/creat-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { ApiResponse } from 'src/shared/api-response';
import { Notes } from './interfaces/note-book.interfacea    ';

@Controller('books')
export class BooksController {
}