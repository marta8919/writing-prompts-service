import { IsNumber, IsOptional, IsString } from 'class-validator'

export class GetPromptsDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    author?: string;
}