import { UserEntity } from 'src/users/user.entity';
export declare class PromptsEntity {
    id: number;
    prompt: string;
    category: string;
    user: UserEntity;
    userId: number;
}
