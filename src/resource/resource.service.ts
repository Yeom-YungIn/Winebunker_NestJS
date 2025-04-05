import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entity/resource.entity';
import { Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { User } from '../user/common/entity/user.entity';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { assign } from 'lodash';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {
  }

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

  async getResourceById(id: number): Promise<Resource> {
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

  async updateResource(updateResourceDto: UpdateResourceDto): Promise<void> {
    const { id, ...updateData } = updateResourceDto;

    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new Error('Resource not found');
    }

    assign(resource, updateData);
    await this.resourceRepository.save(resource);
  }

  async deleteResource(id: number): Promise<void> {
    const resource = await this.getResourceById(id);

    if (!resource) throw new NotFoundException('Resource not found');

    await this.resourceRepository.delete({ id: resource.id });
  }

  async userResource(user: User): Promise<Resource[]> {
    const { name } = user;
    return await this.resourceRepository.find({
      where: { publisherId: name },
    });
  }
}
