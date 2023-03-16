import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PromptsEntity } from './prompts.entity';
import { PromptsController } from './prompts.controller';
import { PromptsService } from './prompts.services';

describe('PromptsController', () => {
  let controller: PromptsController;
  let mockPromptsService: Partial<PromptsService>;

  beforeEach(async () => {
    mockPromptsService = {
        findAll: ()=> Promise.resolve([{prompt: 'test', author_id: '1', category: 'fantansy', id: 4} as PromptsEntity])
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromptsController],
      providers: [
        { provide: PromptsService, useValue: mockPromptsService },
      ],
    }).compile();

    controller = module.get<PromptsController>(PromptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all returns an array', async()=>{
    const prompt = await controller.findAll();
    expect(prompt).toHaveLength(1);
  })
});
