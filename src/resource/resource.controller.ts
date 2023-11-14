import {Body, Controller, Delete, Get, ParseUUIDPipe, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {ResourceService} from "./resource.service";
import {ResourceDto} from "./dto/resource.dto";
import {Resource} from "./entity/resource.entity";
import {ResourceObjValidatePipe} from "./pipe/resource-obj-validate.pipe";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/decorator/get-user.decorator";
import {User} from "../auth/entity/user.entity";

@Controller('resource')
@UseGuards(AuthGuard())
export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService
    ) {
    }

    @Get()
    getAllResource(@Query('page') page: number = 1): Promise<[Resource[], number]> {
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
    saveResource(
        @Body() resourceDto: ResourceDto,
        @GetUser() user: User
    ): Promise<Object> {
        return this.resourceService.saveResource(resourceDto, user)
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
