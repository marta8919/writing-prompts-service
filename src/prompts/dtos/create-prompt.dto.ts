import { IsString } from 'class-validator'

// dto : data transfer object
export class CreatePromptDto {
    @IsString()
    content: string;
}