import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entity/resource.entity';
import { Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { User } from '../user/common/entity/user.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  async getAllResource(page: number = 1): Promise<[Resource[], number]> {
    const pageSize: number = 5;
    return await this.resourceRepository.findAndCount({
      skip: page * pageSize,
      take: pageSize,
    });
  }

  async getResourceListWithVin(): Promise<Object> {
    return await this.resourceRepository
      .createQueryBuilder('resource')
      .innerJoinAndSelect('resource.vin', 'vin')
      .addSelect('resource.id', 'id')
      .addSelect('resource.price', 'price')
      .addSelect('resource.store', 'store')
      .addSelect('resource.purchaseDate', 'purchaseDate')
      .addSelect('vin.vinNameKor', 'vinNameKor')
      .getRawMany();
  }

  async getResource(id: string): Promise<Resource> {
    const found = await this.resourceRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async searchResource(searchVal: string): Promise<Resource[]> {
    return await this.resourceRepository
      .createQueryBuilder('resource')
      .innerJoinAndSelect('resource.vin', 'vin')
      .addSelect('resource.id', 'id')
      .addSelect('resource.price', 'price')
      .addSelect('resource.store', 'store')
      .addSelect('resource.purchaseDate', 'purchaseDate')
      .addSelect('vin.vinNameKor', 'vinNameKor')
      .where('vin.vinNameKor Like :vinNameKor', { vinNameKor: `%${searchVal}%` })
      .getRawMany();
  }

  async saveResource(resourceDto: CreateResourceDto, user: User): Promise<Object> {
    const { vinName, vintage, price, capacity, description, purchaseDate } = resourceDto;

    const resource = this.resourceRepository.create({
      vinName,
      vintage,
      price,
      capacity,
      description,
      purchaseDate,
      issued: new Date(),
      modified: new Date(),
      publisherId: user.name,
    });

    return this.resourceRepository.save(resource);
  }

  async updateResource(resourceDto: ResourceDto): Promise<Object> {
    const { id, price, store, capacity, description, purchaseDate } = resourceDto;

    const updateResource = await this.resourceRepository
      .createQueryBuilder()
      .update(Resource)
      .set({
        price,
        store,
        capacity,
        description,
        purchaseDate,
      })
      .where({
        id,
      })
      .execute();
    if (updateResource.affected) {
      return { result: 'success' };
    }
  }

  async deleteResource(id: string): Promise<Object> {
    const found = await this.getResource(id);

    const deleteResource = await this.resourceRepository.delete({ id: found.id });
    if (deleteResource.affected) {
      return { result: 'success' };
    }
  }

  async userResource(user: User): Promise<Resource[]> {
    const { name } = user;
    return await this.resourceRepository.find({
      where: { publisherId: name },
    });
  }
}
