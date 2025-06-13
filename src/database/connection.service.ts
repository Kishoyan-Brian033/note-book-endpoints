/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { createDatabasePool } from 'src/config/database.config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  async onModuleInit() {
    this.pool = createDatabasePool();
    await this.testConnection();
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
    }
  }

  private async testConnection(): Promise<void> {
    try {
      const note = await this.pool.connect();
      await note.query('SELECT 1');
      note.release();
      console.log('Database connection established succesfully');
    } catch (error) {
      console.error('Failed to connect to database', error);
      throw error;
    }
  }

  async query(text: string, params?: any[]): Promise<any> {
    const note = await this.pool.connect();
    try {
      const result = await note.query(text, params);
      return result;
    } finally {
      note.release();
    }
  }

  async getnote(): Promise<PoolClient> {
    return this.pool.connect();
  }

  async Transaction<T>(callback: (note: PoolClient) => Promise<T>): Promise<T> {
    const note = await this.pool.connect();
    try {
      await note.query('BEGIN');
      const result = callback(note);
      await note.query('COMMIT');
      return result;
    } catch (error) {
      await note.query('ROOLBACK');
      throw error;
    } finally {
      note.release();
    }
  }
}
