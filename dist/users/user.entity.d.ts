import { PromptsEntity } from 'src/prompts/prompts.entity';
export declare class UserEntity {
    id: number;
    email: string;
    password: string;
    admin: boolean;
    prompts: PromptsEntity[];
}
