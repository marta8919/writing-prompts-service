import { Controller, Get, Post } from '@nestjs/common';

@Controller('/prompts')
export class PromptsController {
    @Get('')
    listPrompts(){
        return 'all good'
    }

    @Post('/create')
    createPrompt(){}

    @Get('/:id')
    getPrompt(){}
}
