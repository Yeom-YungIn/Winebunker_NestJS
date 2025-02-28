import {IsNumber, IsString} from "class-validator";

export class VinDto {
    @IsNumber()
    vinSn: number;

    @IsString()
    vinName: string;

    @IsString()
    vinNameKor: string;

    @IsString()
    region: string;
}