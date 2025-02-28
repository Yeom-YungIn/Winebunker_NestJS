import {Body, Controller, Delete, Get, Patch, Post, Query} from '@nestjs/common';
import {VinService} from "./vin.service";
import { Vin } from './common/entity/vin.entity';
import { VinDto } from "./common/dto/vin.dto";

@Controller('vin')
export class VinController {
    constructor(
        private readonly vinService: VinService
    ) {
    }

    @Get('')
    getAllVin(): Promise<Vin[]> {
        return this.vinService.getAllVin();
    }

    @Get('/get')
    getVin(@Query('vinSn') vinSn: number): Promise<Vin> {
        return this.vinService.getVin(vinSn);
    }

    @Get('/list')
    searchVinList(@Query('vinNameKor') vinNameKor: string): Promise<Vin[]> {
        return this.vinService.searchVin(vinNameKor);
    }

    @Post('/save')
    saveVin(@Body() vinDto: VinDto): Promise<Object> {
        return this.vinService.saveVin(vinDto);
    }

    @Patch('/update')
    updateVin(@Body() vinDto: VinDto): Promise<Object> {
        return this.vinService.updateVin(vinDto);
    }

    @Delete('/delete')
    deleteVin(@Body('vinSn') vinSn: number): Promise<Object> {
        return this.vinService.deleteVin(vinSn);
    }
}
