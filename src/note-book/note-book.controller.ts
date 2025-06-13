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
import { note_book } from './interfaces/note-book.interface';

@Controller('books')
export class NoteBookController {
  constructor(private readonly noteBookService: NoteBookService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateNoteDto): Promise<ApiResponse<note_book>> {
    try {
      const note = await this.noteBookService.create(data);
      return {
        success: true,
        message: 'Book created successfully',
        data: note,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create note',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get()
  async findAll(): Promise<ApiResponse<note_book[]>> {
    try {
      const note = await this.noteBookService.findAll();
      return {
        success: true,
        message: `Retrieved ${note.length} book(s)`,
        data: note,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve notes',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<note_book>> {
    try {
      const note = await this.noteBookService.findOne(id);
      return {
        success: true,
        message: 'Note found',
        data: note,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Book not found',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateNoteDto,
  ): Promise<ApiResponse<note_book>> {
    try {
      const updatedNote = await this.noteBookService.update(id, data);
      return {
        success: true,
        message: 'Book updated successfully',
        data: updatedNote,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update book',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Delete(':id/permanent')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<null>> {
    try {
      const result = await this.noteBookService.delete(id);
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to permanently delete book',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
