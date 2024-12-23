import {
    IsNumber,
    IsOptional,
    IsString,
    Min,
    ValidateIf,
} from 'class-validator';

export class SearchProductsDto {
    @IsString()
    @IsOptional()
    sku: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    minPrice: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @ValidateIf((self: SearchProductsDto) => self.maxPrice < self.minPrice)
    maxPrice: string;
}
