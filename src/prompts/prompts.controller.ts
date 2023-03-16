import { Controller, Get, Post, Body, Param, NotFoundException, Delete, Patch } from '@nestjs/common';
import { CreatePromptDto } from './dtos/create-prompt.dto';
import { UpdatePromptDto } from './dtos/update-prompt.dto';
import { PromptsService } from './prompts.services';

@Controller('/prompts')
export class PromptsController {

    constructor(private promptService: PromptsService){}

    @Get()
    findAll(){
        return this.promptService.findAll()
    }

    @Post()
    createPrompt(@Body() body: CreatePromptDto){
        // author_id will be provided from the FE through cookies
        return this.promptService.create(body.content, body.category, body.author_id)
    }

    @Get('/category/:category')
    async listCategoryPrompts(@Param('category') category: string){
        const prompt =  await this.promptService.findByCategory(category)
        if (!prompt){ 
            throw new NotFoundException('Prompt not found')
        } 
        return prompt;
    }

    @Get('/:id')
    async getPrompt(@Param('id') id: number){
        const prompt =  await this.promptService.findOne(id)
        if (!prompt){ 
            throw new NotFoundException('Prompt not found')
        } 
        return prompt;
    }

    @Get('/author/:id')
    // check if it make sense to replace it for a query
    async getByAuthor(@Param('id') id: string){
        const prompt =  await this.promptService.findByAuthor(id)
        if (!prompt){ 
            throw new NotFoundException('No prompts found')
        } 
        return prompt;
    }

    @Delete('/:id')
    removePrompt(@Param('id') id:string){
        return this.promptService.remove(parseInt(id))
    }

    @Patch('/:id')
    updatePrompt(@Param('id') id:string, @Body() body: UpdatePromptDto){
        return this.promptService.update(id, body)
    }
}
