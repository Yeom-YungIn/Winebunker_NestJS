import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Resource} from "./entity/resource.entity";
import {Repository} from "typeorm";
import {ResourceDto} from "./dto/resource.dto";

@Injectable()
export class ResourceService {
    constructor(
        @InjectRepository(Resource)
        private readonly resourceRepository: Repository<Resource>
    ) {
    }

    async getAllResource(page: number = 1): Promise<Resource[]> {
        const take: number = 1;
        const result = await this.resourceRepository.findAndCount({
            take,
            skip: (page - 1) * take
        });
        console.log(result);
        return this.resourceRepository.find();
    }

    async saveResource(resourceDto: ResourceDto): Promise<Object> {
        console.log(resourceDto)
        const {
            vinName,
            vinNameKor,
            price,
            store,
            capacity,
            description,
            purchaseDate
        } = resourceDto;

        const resource = this.resourceRepository.create({
            vinName,
            vinNameKor,
            price,
            store,
            capacity,
            description,
            purchaseDate: new Date(purchaseDate),
            issued: new Date(),
            modified: new Date(),
            publisherId: 'test'
        })

        return this.resourceRepository.save(resource)
    }
}
