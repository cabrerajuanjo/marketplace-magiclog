import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class GetAllQueryDto {
    @IsOptional()
    @IsArray()
    @Transform(
        ({ value }) => value.split(',').map((item: string) => item.trim()),
        { toClassOnly: true },
    )
    @IsString({ each: true })
    sellerEmails: string[];
}
