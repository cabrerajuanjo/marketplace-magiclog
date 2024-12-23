import { IsOptional, IsString } from 'class-validator';

export class GetAllQueryDto {
    @IsString()
    @IsOptional()
    sellerEmail: string;
}
