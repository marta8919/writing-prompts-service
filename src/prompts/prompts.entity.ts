import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class PromptsEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    prompt: string;
    @Column()
    category: string;
    @Column()
    author_id: string;
}