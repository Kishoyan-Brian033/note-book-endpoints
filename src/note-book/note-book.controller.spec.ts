import { Test, TestingModule } from '@nestjs/testing';
import { NoteBookController } from './note-book.controller';

describe('NoteBookController', () => {
  let controller: NoteBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteBookController],
    }).compile();

    controller = module.get<NoteBookController>(NoteBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
