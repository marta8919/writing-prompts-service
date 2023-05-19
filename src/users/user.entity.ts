import { PromptsEntity } from '../prompts/prompts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // I can create a custom validator to check if it's unique
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => PromptsEntity, (prompt) => prompt.user)
  prompts: PromptsEntity[];
}
