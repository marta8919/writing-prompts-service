import { CreatePromptDto } from './dtos/create-prompt.dto';
import { UpdatePromptDto } from './dtos/update-prompt.dto';
import { PromptsService } from './prompts.services';
export declare class PromptsController {
    private promptService;
    constructor(promptService: PromptsService);
    findAll(): Promise<import("./prompts.entity").PromptsEntity[]>;
    createPrompt(body: CreatePromptDto): Promise<import("./prompts.entity").PromptsEntity>;
    listCategoryPrompts(category: string): Promise<import("./prompts.entity").PromptsEntity[]>;
    getPrompt(id: number): Promise<import("./prompts.entity").PromptsEntity>;
    getByAuthor(id: string): Promise<import("./prompts.entity").PromptsEntity>;
    removePrompt(id: string): Promise<void>;
    updatePrompt(id: string, body: UpdatePromptDto): Promise<void>;
}
