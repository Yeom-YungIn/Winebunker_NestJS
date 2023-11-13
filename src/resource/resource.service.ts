import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Resource} from "./entity/resource.entity";
import {Repository} from "typeorm";
import {ResourceDto} from "./dto/resource.dto";
import {isUUID} from "class-validator";

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

        if (!found) {
            throw new NotFoundException();
        }
        return found;
    }

    async searchResource(search: string): Promise<Resource[]> {
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
            publisherId: 'tbd'
        })

        return this.resourceRepository.save(resource)
    }

    async updateResource(resourceDto: ResourceDto): Promise<Object> {
        console.log(resourceDto)
        const {
            id,
            vinName,
            vinNameKor,
            price,
            store,
            capacity,
            description,
            purchaseDate
        } = resourceDto;

        const updateResource = await this.resourceRepository.createQueryBuilder().update(Resource).set({
            vinName,
            vinNameKor,
            price,
            store,
            capacity,
            description,
            purchaseDate
        }).where({
            id
        }).execute();
        console.log(updateResource)
        if (updateResource.affected) {
            return {result: "success"};
        }
    }

    async deleteResource(id: string): Promise<Object> {
        const found = await this.getResource(id);

        const deleteResource = await this.resourceRepository.delete({id: found.id});
        console.log(deleteResource);
        if (deleteResource.affected) {
            return {result: "success"}
        }
    }
}
