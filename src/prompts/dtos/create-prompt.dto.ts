import { IsString } from 'class-validator'

export class CreatePromptDto {
    @IsString()
    prompt: string;
    @IsString()
    category: string;
}