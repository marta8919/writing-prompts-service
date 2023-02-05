import { CreatePromptDto } from './dtos/create-prompt.dto';
export declare class PromptsController {
    listPrompts(): string;
    createPrompt(body: CreatePromptDto): void;
    getPrompt(id: string): void;
}
