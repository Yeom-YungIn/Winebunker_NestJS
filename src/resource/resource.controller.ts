import {Body, Controller, Delete, Get, Patch, Post, Query} from '@nestjs/common';
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

    @Get('/get')
    getResource(@Query('id') id: string): Promise<Resource> {
        return this.resourceService.getResource(id);
    }

    @Post('/save')
    saveResource(@Body() resourceDto: ResourceDto): Promise<Object> {
        console.log(resourceDto)
        return this.resourceService.saveResource(resourceDto)
    }

    @Patch('/update')
    updateResource(@Body() id: string, resourceDto: ResourceDto): Promise<Object> {
        return this.resourceService.updateResource(id, resourceDto);
    }

    @Delete()
    deleteResource(@Body() id: string): Promise<Object> {
        return this.resourceService.deleteResource(id);
    }
}
