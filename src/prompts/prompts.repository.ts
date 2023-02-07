import { Injectable } from '@nestjs/common';
import { readFile, writeFile} from 'fs/promises'

@Injectable()
export class PromptsRepository{

    async findOne(id: string){
        const contents = await readFile('prompts.json', 'utf8')
        const prompts = JSON.parse(contents);
        return prompts[id]
    }

    async findAll(){
        const contents = await readFile('prompts.json', 'utf8')
        const prompts = JSON.parse(contents);
        return prompts;
    }
    async create(prompt: string){
        const contents = await readFile('prompts.json', 'utf8')
        const prompts = JSON.parse(contents);

        const id = Math.floor(Math.random()*999)

        prompts[id] = {id, content: prompt}

        await writeFile('prompts.json', JSON.stringify(prompts))
    }
}