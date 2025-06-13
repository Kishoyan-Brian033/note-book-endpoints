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
import { DatabaseService } from 'src/database/connection.serverce';
import { CreateNoteDto } from './dtos/creat-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';

@Injectable()
export class NoteBookService {
  mapRowToNote: any;
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateNoteDto): Promise<Notes> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM create_note($1, $2, $3)`,
        [data.title, data.created_at, data.content],
      );

      if (result.rows.length === 0) {
        throw new InternalServerErrorException('Failed to create note');
      }

      return this.mapRowToNote(result.rows[0]);
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        throw new ConflictException('A note with this title already exists');
      }
      throw new InternalServerErrorException('Failed to create note');
    }
  }

  async findAll(): Promise<Note[]> {
    try {
      const result = await this.databaseService.query(
        'SELECT * FROM get_all_notes()',
      );

      return result.rows.map(this.mapRowToNote);
    } catch {
      throw new InternalServerErrorException('Failed to retrieve books');
    }
  }
  async findOne(id: number): Promise<Note> {
    try {
      const result = await this.databaseService.query(
        'SELECT * FROM get_note_by_id($1)',
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

  async update(id: number, data: UpdateNoteDto): Promise<Note> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM sp_update_book($1, $2, $3, $4)`,
        [data.title || null, data.create_at || null, data.content || null],
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      return this.mapRowToNote(result.rows[0]);
    } catch (error: any) {
      if (error.message?.includes('not found')) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      if (error.message?.includes('Title already exists')) {
        throw new ConflictException('Another note with this title exixts');
      }
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

  private mapRowToBook(row: any): Note {
    return {
      id: row.id,
      title: row.title,
      create_at: row.created_at,
      content: row.content,
    };
  }
}
