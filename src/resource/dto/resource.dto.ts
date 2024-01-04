import {IsNumber, IsString} from "class-validator";
export class ResourceDto {
    @IsString()
    id: string;

    @IsNumber()
    vinSn: number;

    @IsNumber()
    vintage: number;

    @IsNumber()
    price: number;

    @IsString()
    store: string;

    @IsString()
    capacity: string;

    @IsString()
    description: string;

    @IsString()
    purchaseDate: string;
}