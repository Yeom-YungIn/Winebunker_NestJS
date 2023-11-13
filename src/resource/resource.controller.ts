import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query} from '@nestjs/common';
import {ResourceService} from "./resource.service";
import {ResourceDto} from "./dto/resource.dto";
import {Resource} from "./entity/resource.entity";
import {ResourceObjValidatePipe} from "./pipe/resource-obj-validate.pipe";

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
    getResource(@Query('id', ParseUUIDPipe) id: string): Promise<Resource> {
        return this.resourceService.getResource(id);
    }

    @Get('/search')
    searchResource(@Query('search') search: string): Promise<Resource[]> {
        return this.resourceService.searchResource(search);
    }

    @Post('/save')
    saveResource(@Body() resourceDto: ResourceDto): Promise<Object> {
        console.log(resourceDto)
        return this.resourceService.saveResource(resourceDto)
    }

    @Patch('/update')
    updateResource(@Body(ResourceObjValidatePipe) resourceDto: ResourceDto): Promise<Object> {
        console.log(resourceDto)
        return this.resourceService.updateResource(resourceDto);
    }

    @Delete('/delete')
    deleteResource(@Body('id', ParseUUIDPipe) id: string): Promise<Object> {
        return this.resourceService.deleteResource(id);
    }
}
