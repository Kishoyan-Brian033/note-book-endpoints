/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/connection.service';
import { CreateNoteDto } from './dtos/creat-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { note_book } from './interfaces/note-book.interface';

@Injectable()
export class NoteBookService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createNoteDto: CreateNoteDto): Promise<note_book> {
    try {
      const result = await this.databaseService.query(
        'SELECT * FROM create_note($1::TEXT, $2::TIMESTAMP, $3::TEXT)',
        [createNoteDto.title, createNoteDto.created_at, createNoteDto.content],
      );
      if (result.rows.length === 0) {
        throw new NotFoundException('Note not found');
      }
      return result.rows[0];
    } catch (error) {
      if (error.message.includes('already exists')) {
        throw new ConflictException(
          `Note with title${createNoteDto.title} already exists`,
        );
      }
      console.error('Database error:', error);
      throw new InternalServerErrorException('Failed to create Note');
    }
  }

  async findAll(): Promise<note_book[]> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM get_all_notes()`,
      );
      if (result.rows.length === 0) {
        throw new NotFoundException('No note found');
      }
      return result.rows;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Database error:', error);
      throw new InternalServerErrorException('Failed to retrieve NOtes');
    }
  }

  async findOne(id: number): Promise<note_book> {
    try {
      const result = await this.databaseService.query(
        'SELECT * FROM get_by_id($1)',
        [id],
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }

      return this.mapRowToNote(result.rows[0]);
    } catch {
      throw new InternalServerErrorException('Failed to retrieve note');
    }
  }
  async update(id: number, data: UpdateNoteDto): Promise<note_book> {
    try {
      const result = await this.databaseService.query(
        'SELECT * FROM update_note($1, $2, $3, $4)',
        [id, data.title, data.create_at, data.content],
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }

      return result.rows[0];
    } catch (error) {
      console.error('Database error:', error); // <== important!
      throw new InternalServerErrorException('Failed to update note');
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      const result = await this.databaseService.query(
        'SELECT * FROM delete_note($1)',
        [id],
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }

      return { message: result.rows[0].message };
    } catch {
      throw new InternalServerErrorException('Failed to delete note');
    }
  }

  private mapRowToNote(row: any): note_book {
    return {
      id: row.id,
      title: row.title,
      created_at: row.created_at,
      content: row.content,
    };
  }
}
