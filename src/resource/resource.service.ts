import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Resource} from "./entity/resource.entity";
import {ResourceDto} from "./dto/resource.dto";
import {User} from "../auth/entity/user.entity";
import {ResourceRepository} from "./resource.repository";

@Injectable()
export class ResourceService {
    constructor(
        @InjectRepository(Resource)
        private readonly resourceRepository: ResourceRepository
    ) {}

    async getAllResource(page: number = 1): Promise<[Resource[], number]> {
        const pageSize: number = 5;
        return await this.resourceRepository.findAndCount(page, pageSize);
    }


    async getResourceListWithVin(): Promise<Object> {
        return this.resourceRepository.getResourceListWithVin()
    }

    async getResource(id: string): Promise<Resource> {
        return await this.resourceRepository.getResource(id);
    }

    async searchResource(searchVal: string): Promise<Resource[]> {
        return this.resourceRepository.searchResource(searchVal);
    }

    async saveResource(resourceDto: ResourceDto, user: User): Promise<Object> {
        return this.resourceRepository.saveResource(resourceDto, user)
    }

    async updateResource(resourceDto: ResourceDto): Promise<Object> {
        return await this.resourceRepository.updateResource(resourceDto);
    }

    async deleteResource(id: string): Promise<Object> {
        const found = await this.getResource(id);

        return await this.resourceRepository.deleteResource(found.id);
    }

    async userResource(user: User): Promise<Resource[]> {
        return await this.resourceRepository.userResource(user);
    }
}
