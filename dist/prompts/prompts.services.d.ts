import { PromptsEntity } from "./prompts.entity";
import { Repository } from "typeorm";
export declare class PromptsService {
    private repo;
    constructor(repo: Repository<PromptsEntity>);
    findAll(): Promise<PromptsEntity[]>;
    xw: any;
    findByCategory(category: string): Promise<PromptsEntity[]>;
    create(prompt: string, category: string, author_id: string): Promise<PromptsEntity>;
    findOne(id: number): Promise<PromptsEntity>;
    findByAuthor(id: string): Promise<PromptsEntity>;
    remove(id: number): Promise<void>;
    update(id: string, attrs: Partial<PromptsEntity>): Promise<void>;
}
