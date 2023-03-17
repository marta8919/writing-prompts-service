import { CreatePromptDto } from './dtos/create-prompt.dto';
import { UpdatePromptDto } from './dtos/update-prompt.dto';
import { PromptsService } from './prompts.services';
import { UserEntity } from 'src/users/user.entity';
export declare class PromptsController {
    private promptService;
    constructor(promptService: PromptsService);
    findAll(): Promise<import("./prompts.entity").PromptsEntity[]>;
    getPrompt(id: number): Promise<import("./prompts.entity").PromptsEntity>;
    createPrompt(body: CreatePromptDto, user: UserEntity): Promise<import("./prompts.entity").PromptsEntity>;
    listCategoryPrompts(category: string): Promise<import("./prompts.entity").PromptsEntity[]>;
    getByAuthor(id: number): Promise<import("./prompts.entity").PromptsEntity[]>;
    removePrompt(id: number, user: UserEntity): Promise<void>;
    updatePrompt(id: string, body: UpdatePromptDto, user: UserEntity): Promise<void>;
}
