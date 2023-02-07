import { Injectable } from "@nestjs/common";
import { PromptsRepository } from "./prompts.repository";

@Injectable()
export class PromptsService{

    constructor(public promptsRepo: PromptsRepository){}

    async findOne(id: string){
        return this.promptsRepo.findOne(id);
    }

    async findAll(){
        return this.promptsRepo.findAll();
    }
    async create(prompt: string){
        return this.promptsRepo.create(prompt);
    }
}