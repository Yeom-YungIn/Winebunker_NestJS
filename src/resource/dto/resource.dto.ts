import {IsDate, IsNumber, IsString} from "class-validator";
export class ResourceDto {
    @IsString()
    id: string;

    @IsNumber()
    vinSn: number;

    @IsNumber()
    vintage: number;

    @IsString()
    price: number;

    @IsString()
    store: string;

    @IsString()
    capacity: string;

    @IsString()
    description: string;

    @IsDate()
    purchaseDate: Date;
}