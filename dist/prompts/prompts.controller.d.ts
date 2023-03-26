import { CreatePromptDto } from './dtos/create-prompt.dto';
import { UpdatePromptDto } from './dtos/update-prompt.dto';
import { PromptsService } from './prompts.services';
import { UserEntity } from '../users/user.entity';
import { GetPromptsDto } from './dtos/get-prompts.dto';
import { PromptsEntity } from './prompts.entity';
export declare class PromptsController {
    private promptService;
    constructor(promptService: PromptsService);
    findAll(): Promise<PromptsEntity[]>;
    getPrompt(query: GetPromptsDto): Promise<PromptsEntity | PromptsEntity[]>;
    createPrompt(body: CreatePromptDto, user: UserEntity): Promise<PromptsEntity>;
    removePrompt(id: number, user: UserEntity): Promise<void>;
    updatePrompt(id: string, body: UpdatePromptDto, user: UserEntity): Promise<void>;
}
