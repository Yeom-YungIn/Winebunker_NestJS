import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Resource} from "./entity/resource.entity";
import {Repository} from "typeorm";
import {ResourceDto} from "./dto/resource.dto";
import {User} from "../auth/entity/user.entity";

@Injectable()
export class ResourceService {
    constructor(
        @InjectRepository(Resource)
        private readonly resourceRepository: Repository<Resource>
    ) {}

    async getAllResource(page: number = 1): Promise<[Resource[], number]> {
        const pageSize: number = 5;
        return await this.resourceRepository.findAndCount({
            skip: page * pageSize,
            take: pageSize,
        });
    }

    async getResourceListWithVin(): Promise<Object> {
        return await this.resourceRepository.find({
            relations: {
                vin: true,
            }
        })
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

    async saveResource(resourceDto: ResourceDto, user: User): Promise<Object> {
        const {
            vinSn,
            vintage,
            price,
            store,
            capacity,
            description,
            purchaseDate
        } = resourceDto;

        const resource = this.resourceRepository.create({
            vinSn,
            vintage,
            price,
            store,
            capacity,
            description,
            purchaseDate: new Date(purchaseDate),
            issued: new Date(),
            modified: new Date(),
            publisherId: user.userName
        })

        return this.resourceRepository.save(resource)
    }

    async updateResource(resourceDto: ResourceDto): Promise<Object> {
        const {
            id,
            price,
            store,
            capacity,
            description,
            purchaseDate
        } = resourceDto;

        const updateResource = await this.resourceRepository.createQueryBuilder().update(Resource).set({
            price,
            store,
            capacity,
            description,
            purchaseDate
        }).where({
            id
        }).execute();
        if (updateResource.affected) {
            return {result: "success"};
        }
    }

    async deleteResource(id: string): Promise<Object> {
        const found = await this.getResource(id);

        const deleteResource = await this.resourceRepository.delete({id: found.id});
        if (deleteResource.affected) {
            return {result: "success"}
        }
    }

    async userResource(user: User): Promise<Resource[]> {
        const {userName} = user;
        return await this.resourceRepository.find({
            where: {publisherId: userName}
        })
    }
}
