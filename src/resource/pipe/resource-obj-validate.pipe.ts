import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import {isNumber} from "class-validator";
import {Capacity} from "../enum/capacity.enum";

export class ResourceObjValidatePipe implements PipeTransform {

    readonly capacityOptions = [
        Capacity.Capacity150,
        Capacity.Capacity300,
        Capacity.Capacity750,
    ]

    transform(value: any, metadata: ArgumentMetadata): any {
        console.log(value);

        if (value.vinName) {
            value.vinName = value.vinName.toUpperCase();
        }

        if (!value.vinNameKor) {
            throw new BadRequestException("vinNameKor is Required");
        }

        if (value.price) {
            this.isPrice(value.price);
        }

        if (value.capacity) {
            if (!this.capacityOptions.includes(value.capacity)) {
                throw new BadRequestException("Capacity is not invalid")
            }
        }

        return value;
    }

    private isPrice(price: number): void {
        if (!isNumber(price)) {
            throw new BadRequestException("price parameter type is only number")
        }
        if (price >= 99999999 && price < 0) {
            throw new BadRequestException("This price is not allowed")
        }
    }
}