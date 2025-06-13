import { Test, TestingModule } from '@nestjs/testing';
import { NoteBookService } from './note-book.service';

describe('NoteBookService', () => {
  let service: NoteBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteBookService],
    }).compile();

    service = module.get<NoteBookService>(NoteBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
