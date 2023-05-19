import { Expose } from 'class-transformer';

export class PromptsDto {
  @Expose()
  id: string;
  @Expose()
  prompt: string;
  @Expose()
  category: string;

  @Expose()
  userId: number;
}
