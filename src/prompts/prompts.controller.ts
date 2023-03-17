import { Controller, Get, Post, Body, Param, NotFoundException, Delete, Patch, UseGuards, Query } from '@nestjs/common';
import { CreatePromptDto } from './dtos/create-prompt.dto';
import { UpdatePromptDto } from './dtos/update-prompt.dto';
import { PromptsService } from './prompts.services';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { PromptsDto } from './dtos/prompts.dto';

@Controller('/prompts')
export class PromptsController {

    constructor(private promptService: PromptsService){}

    @Get('/all')
    findAll(){
        return this.promptService.findAll()
    }

    @Get()
    async getPrompt(@Query('id') id: number){
        const prompt =  await this.promptService.findOne(id)
        if (!prompt){ 
            throw new NotFoundException('Prompt not found')
        } 
        return prompt;
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(PromptsDto)
    createPrompt(@Body() body: CreatePromptDto, @CurrentUser() user: UserEntity){
        return this.promptService.create(body, user)
    }

    @Get('/category/:category')
    async listCategoryPrompts(@Param('category') category: string){
        const prompt =  await this.promptService.findByCategory(category)
        if (!prompt){ 
            throw new NotFoundException('Prompt not found')
        } 
        return prompt;
    }

    @Get('/author/:id')
    async getByAuthor(@Param('id') id: number){
        const prompt =  await this.promptService.findByAuthor(id)
        if (!prompt){ 
            throw new NotFoundException('No prompts found')
        } 
        return prompt;
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    removePrompt(@Param('id') id:number, @CurrentUser() user: UserEntity){
        return this.promptService.remove(id, user.id)
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    updatePrompt(@Param('id') id:string, @Body() body: UpdatePromptDto, @CurrentUser() user: UserEntity){
        return this.promptService.update(id, body, user.id)
    }
}
