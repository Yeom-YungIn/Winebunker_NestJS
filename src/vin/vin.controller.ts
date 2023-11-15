import {Body, Controller, Delete, Get, Patch, Post, Query} from '@nestjs/common';
import {VinService} from "./vin.service";
import {Vin} from "./entity/vin.entity";
import {VinDto} from "./dto/vin.dto";

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
