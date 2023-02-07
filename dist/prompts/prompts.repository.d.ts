export declare class PromptsRepository {
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    create(prompt: string): Promise<void>;
}
