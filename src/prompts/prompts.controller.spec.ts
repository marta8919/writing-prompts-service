import { Test, TestingModule } from '@nestjs/testing';
import { PromptsEntity } from './prompts.entity';
import { PromptsController } from './prompts.controller';
import { PromptsService } from './prompts.services';
import { NotFoundException } from '@nestjs/common';
import { CreatePromptDto } from './dtos/create-prompt.dto';
import { UserEntity } from '../users/user.entity';

describe('PromptsController', () => {
  let controller: PromptsController;
  let mockPromptsService: Partial<PromptsService>;

  beforeEach(async () => {
    mockPromptsService = {
        findAll: ()=> Promise.resolve([{prompt: 'test', category: 'fantansy', id: 4} as PromptsEntity]),
        findOne:(id: number)=> Promise.resolve({prompt: 'test', category: 'fantansy', id: 4, userId: 1} as unknown as PromptsEntity),
        create: (promptdto: CreatePromptDto, user: UserEntity)=> Promise.resolve({} as PromptsEntity)
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

  //ToDo, need to adjust these tests
  // it('find one prompt based on id returns one one result', async()=> {
  //   const prompt = await controller.getPrompt(1);
  //   expect(prompt).toEqual({prompt: 'test', category: 'fantansy', id: 4, userId: 1})
  // })

  // it('should throw an error if prompt is not found', async()=> {
  //   mockPromptsService.findOne= ()=> null;
  //   await expect(controller.getPrompt(1)).rejects.toThrow(NotFoundException)
  // })

  // it('it is possible to create a new prompt', async()=> {
  //   // await expect(controller.createPrompt(promptdto: {prompt: 'test', category: 'test'}))
  // })
});
