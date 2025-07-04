import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
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
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@Controller('note-book')
export class NoteBookController {
  constructor(private readonly noteBookService: NoteBookService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new note' })
  @ApiCreatedResponse({
    description: 'Note successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  async create(@Body() data: CreateNoteDto): Promise<ApiResponse<note_book>> {
    try {
      const note = await this.noteBookService.create(data);
      return {
        success: true,
        message: 'Note created successfully',
        data: note,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to create note',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  @ApiInternalServerErrorResponse({ description: 'internal server error' })
  async findAll(): Promise<ApiResponse<note_book[]>> {
    try {
      const notes = await this.noteBookService.findAll();
      return {
        success: true,
        message: `Retrieved ${notes.length} note(s)`,
        data: notes,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve notes',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get by id' })
  @ApiInternalServerErrorResponse({ description: 'internal server error' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<note_book>> {
    try {
      const note = await this.noteBookService.findOne(id);
      if (!note) {
        throw new HttpException(
          {
            success: false,
            message: `Note with ID ${id} not found`,
            error: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Note found',
        data: note,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve note',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update ' })
   @ApiInternalServerErrorResponse({ description: 'internal server error' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateNoteDto,
  ): Promise<ApiResponse<note_book>> {
    try {
      const updatedNote = await this.noteBookService.update(id, data);
      return {
        success: true,
        message: 'Note updated successfully',
        data: updatedNote,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to update note',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id/permanent')
  @ApiOperation({ summary: 'delete' })
   @ApiInternalServerErrorResponse({ description: 'internal server error' })
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
      throw new HttpException(
        {
          success: false,
          message: 'Failed to delete note',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
