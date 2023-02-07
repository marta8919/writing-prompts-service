import { CreatePromptDto } from './dtos/create-prompt.dto';
import { PromptsService } from './prompts.services';
export declare class PromptsController {
    promptService: PromptsService;
    constructor(promptService: PromptsService);
    listPrompts(): Promise<any>;
    createPrompt(body: CreatePromptDto): Promise<void>;
    getPrompt(id: string): Promise<any>;
}
