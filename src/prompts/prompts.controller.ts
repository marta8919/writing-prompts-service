import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreatePromptDto } from './dtos/create-prompt.dto';
import { PromptsService } from './prompts.services';

@Controller('/prompts')
export class PromptsController {

    constructor(public promptService: PromptsService){}

    @Get()
    listPrompts(){
        return this.promptService.findAll()
    }

    @Post()
    createPrompt(@Body() body: CreatePromptDto){
        return this.promptService.create(body.content)

    }

    @Get('/:id')
    async getPrompt(@Param('id') id: string){
        const prompt =  await this.promptService.findOne(id)
        if (!prompt){ 
            throw new NotFoundException('Prompt not found')
        } 
        return prompt;
    }
}
