import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PromptsEntity } from './prompts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromptDto } from './dtos/create-prompt.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class PromptsService {
  constructor(
    @InjectRepository(PromptsEntity) private repo: Repository<PromptsEntity>,
  ) {
    this.repo = repo;
  }

  findAll() {
    return this.repo.find();
  }

  findByCategory(category: string) {
    return this.repo.find({ where: { category } });
  }

  create(promptdto: CreatePromptDto, user: UserEntity) {
    const prompt_created = this.repo.create(promptdto);
    prompt_created.user = user;
    return this.repo.save(prompt_created);
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id: id } });
  }

  findByAuthor(id: number) {
    return this.repo.find({ where: { user: { id: id } } });
  }

  async remove(id: number, userId: number) {
    const prompt = await this.findOne(id);
    if (!prompt) throw new NotFoundException('No prompt found');
    if (prompt.user.id === userId) {
      this.repo.remove(prompt);
    } else {
      throw new UnauthorizedException('Not authorized');
    }
  }

  async update(id: string, attrs: Partial<PromptsEntity>, userId: number) {
    const prompt = await this.findOne(parseInt(id));
    if (!prompt) throw new NotFoundException('No prompt found');
    if (prompt.user.id === userId) {
      Object.assign(prompt, attrs);
      this.repo.save(prompt);
    } else {
      throw new UnauthorizedException(
        'Sorry not authorized to change this prompt',
      );
    }
  }
}
