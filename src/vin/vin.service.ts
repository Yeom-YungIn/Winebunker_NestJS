import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from 'typeorm';
import { Vin } from './common/entity/vin.entity';
import { VinDto } from './common/dto/vin.dto';

@Injectable()
export class VinService {
  constructor(
    @InjectRepository(Vin)
    private readonly vinRepository: Repository<Vin>,
  ) {}

  async getAllVin(): Promise<Vin[]> {
    return this.vinRepository.find();
  }

  async getVin(vinSn: number): Promise<Vin> {
    return this.vinRepository.findOneBy({ vinSn });
  }

  async searchVin(vinNameKor: string): Promise<Vin[]> {
    return this.vinRepository.findBy({ vinNameKor: Like(`%${vinNameKor}%`) });
  }

  async saveVin(vinDto: VinDto): Promise<Vin> {
    const { vinName, vinNameKor, region } = vinDto;
    const vin = this.vinRepository.create({
      vinName,
      vinNameKor,
      region,
    });

    return await this.vinRepository.save(vin);
  }

  async updateVin(vinDto: VinDto): Promise<Object> {
    const { vinSn, vinName, vinNameKor, region } = vinDto;

    const updateVin = await this.vinRepository
      .createQueryBuilder()
      .update(Vin)
      .set({
        vinName,
        vinNameKor,
        region,
      })
      .where({
        vinSn,
      })
      .execute();

    if (updateVin.affected) {
      return { result: 'success' };
    }
  }

  async deleteVin(vinSn: number): Promise<Object> {
    const found: Vin = await this.getVin(vinSn);

    const deleteVin = await this.vinRepository.delete({ vinSn: found.vinSn });

    if (deleteVin.affected) {
      return { result: 'success' };
    }
  }
}
