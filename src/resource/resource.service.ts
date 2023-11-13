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
    ) {}

    async getAllResource(page: number = 1): Promise<Resource[]> {
        const take: number = 1;
        const found = await this.resourceRepository.findAndCount({
            take,
            skip: page
        });
        console.log(found);
        return this.resourceRepository.find();
    }

    async getResource(id: string): Promise<Resource> {
        const found = await this.resourceRepository.findOneBy({id});
        return found;
    }

    async searchResource(resourceDto: ResourceDto): Promise<Resource[]> {
        return;
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

    async updateResource(id: string, resourceDto: ResourceDto): Promise<Object> {
        return;
    }

    async deleteResource(id: string): Promise<Object> {
        return;
    }
}
