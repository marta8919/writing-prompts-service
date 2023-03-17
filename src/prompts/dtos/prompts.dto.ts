import { Expose, Transform } from "class-transformer";

export class PromptsDto {
    @Expose()
    id: string;
    @Expose()
    prompt: string;
    @Expose()
    category: string;

    @Transform(({obj})=> 
    {console.log('object', obj), obj.user.id})
    @Expose()
    userId: number;

}