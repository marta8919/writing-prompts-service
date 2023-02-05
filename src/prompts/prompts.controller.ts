import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreatePromptDto } from './dtos/create-prompt.dto';

@Controller('/prompts')
export class PromptsController {
    @Get()
    listPrompts(){
        return 'all good'
    }

    @Post()
    createPrompt(@Body() body: CreatePromptDto){
        console.log('on post', body)
    }

    @Get('/:id')
    getPrompt(@Param('id') id: string){
        console.log('on get id', id)
    }
}
