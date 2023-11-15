import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Vin} from "./entity/vin.entity";
import {Repository} from "typeorm";
import {VinDto} from "./dto/vin.dto";

@Injectable()
export class VinService {
    constructor(
        @InjectRepository(Vin)
        private readonly vinRepository: Repository<Vin>
    ) {
    }

    async getAllVin(): Promise<Vin[]> {
        return this.vinRepository.find();
    }

    async getVin(vinSn: number): Promise<Vin> {
        return this.vinRepository.findOneBy({vinSn});
    }

    async saveVin(vinDto: VinDto): Promise<Vin> {
        const { vinName, vinNameKor, region} = vinDto;
        const vin = await this.vinRepository.create({
            vinName,
            vinNameKor,
            region
        })

        return await this.vinRepository.save(vin);
    }

    async updateVin(vinDto: VinDto): Promise<Object> {
        const { vinSn ,vinName, vinNameKor, region} = vinDto;

        const updateVin = await this.vinRepository.createQueryBuilder().update(Vin).set({
            vinName,
            vinNameKor,
            region
        }).where({
            vinSn
        }).execute();

        if (updateVin.affected) {
            return {result: "success"};
        }
    }

    async deleteVin(vinSn: number): Promise<Object> {
        const found: Vin = await this.getVin(vinSn);

        const deleteVin = await this.vinRepository.delete({vinSn: found.vinSn});

        if (deleteVin.affected) {
            return {result: "success"}
        }
    }

}
