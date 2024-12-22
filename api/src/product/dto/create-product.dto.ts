import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    sku: string;

    @IsString()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsNumber()
    @Min(0)
    sellerId: number;
}
