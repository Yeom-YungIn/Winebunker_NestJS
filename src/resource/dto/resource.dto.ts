import {IsDate, IsString} from "class-validator";
export class ResourceDto {
    @IsString()
    vinName: string;

    @IsString()
    vinNameKor: string;

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