import { PromptsEntity } from './prompts.entity';
import { Repository } from 'typeorm';
import { CreatePromptDto } from './dtos/create-prompt.dto';
import { UserEntity } from 'src/users/user.entity';
export declare class PromptsService {
    private repo;
    constructor(repo: Repository<PromptsEntity>);
    findAll(): Promise<PromptsEntity[]>;
    findByCategory(category: string): Promise<PromptsEntity[]>;
    create(promptdto: CreatePromptDto, user: UserEntity): Promise<PromptsEntity>;
    findOne(id: number): Promise<PromptsEntity>;
    findByAuthor(id: number): Promise<PromptsEntity[]>;
    remove(id: number, userId: number): Promise<void>;
    update(id: string, attrs: Partial<PromptsEntity>, userId: number): Promise<void>;
}
