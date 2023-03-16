import { Injectable, NotFoundException } from "@nestjs/common";
import { PromptsEntity } from "./prompts.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Injectable()
export class PromptsService{
    constructor(@InjectRepository(PromptsEntity) private repo: Repository<PromptsEntity>){
        this.repo= repo;
    }

    findAll(){
        return this.repo.find()
    }
xw
    findByCategory(category: string){
        if(!category) throw new NotFoundException('No prompt on this category')
        return this.repo.find({where: {category}});
    }

    create(prompt: string, category: string, author_id: string){
        const prompt_created = this.repo.create({prompt, category, author_id})
        return this.repo.save(prompt_created)
    }

    findOne(id: number){
        if(!id) throw new NotFoundException('Prompt not found')
        return this.repo.findOne({where: {id: id}});
    }

    findByAuthor(id: string){
        if(!id) throw new NotFoundException('Author not found')
        return this.repo.findOne({where: {author_id: id}});
    }

    async remove(id: number){
        const prompt = await this.findOne(id)
        if(!id) throw new NotFoundException('No prompt found')

        this.repo.remove(prompt)
    }

    async update(id: string, attrs: Partial<PromptsEntity>){
        // if logged in ID is the same as author_id proceed
        const prompt = await this.findOne(parseInt(id))
        if(!prompt) throw new NotFoundException('No prompt found')
        Object.assign(prompt, attrs);
        this.repo.save(prompt)
    }
}