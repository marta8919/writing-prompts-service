import { IsString } from 'class-validator'

// dto : data transfer object
export class CreatePromptDto {
    @IsString()
    content: string;
    @IsString()
    category: string;
    @IsString()
    author_id: string;
}