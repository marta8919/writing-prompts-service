import { PromptsRepository } from "./prompts.repository";
export declare class PromptsService {
    promptsRepo: PromptsRepository;
    constructor(promptsRepo: PromptsRepository);
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    create(prompt: string): Promise<void>;
}
