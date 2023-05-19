import { UserEntity } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class PromptsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  prompt: string;
  @Column()
  category: string;

  @ManyToOne(() => UserEntity, (user) => user.prompts)
  user: UserEntity;
}
