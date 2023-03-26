import { UserEntity } from '../users/user.entity';
export declare class PromptsEntity {
    id: number;
    prompt: string;
    category: string;
    user: UserEntity;
}
