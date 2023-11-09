import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {ResourceService} from "./resource.service";
import {ResourceDto} from "./dto/resource.dto";
import {Resource} from "./entity/resource.entity";

@Controller('resource')
export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService
    ) {
    }

    @Get()
    getAllResource(@Query('page') page: number = 1): Promise<Resource[]> {
        return this.resourceService.getAllResource(page);
    }

    @Post('/save')
    saveResource(@Body(

    ) resourceDto: ResourceDto): Promise<Object> {
        console.log(resourceDto)
        return this.resourceService.saveResource(resourceDto)
    }
}
