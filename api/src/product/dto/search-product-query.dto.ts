import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SearchProductsQueryDto {
    @IsString()
    @IsOptional()
    sku: string;

    @IsString()
    @IsOptional()
    name: string;

    @Transform((params: TransformFnParams) => +params.value)
    @IsNumber()
    @IsOptional()
    @Min(0)
    minPrice: number;

    @Transform((params: TransformFnParams) => +params.value)
    @IsNumber()
    @IsOptional()
    @Min(0)
    maxPrice: number;
}
