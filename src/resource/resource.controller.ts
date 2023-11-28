import {Body, Controller, Delete, Get, ParseUUIDPipe, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {ResourceService} from "./resource.service";
import {ResourceDto} from "./dto/resource.dto";
import {Resource} from "./entity/resource.entity";
import {ResourceObjValidatePipe} from "./pipe/resource-obj-validate.pipe";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/decorator/get-user.decorator";
import {User} from "../auth/entity/user.entity";
import {
    ApiTags,
    ApiOperation
} from '@nestjs/swagger';

@ApiTags('리소스 API')
@Controller('resource')
// @UseGuards(AuthGuard())
export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService
    ) {
    }

    @Get()
    @ApiOperation({summary: "리소스 목록 조회", description: "리소스 데이터만 조회"})
    getAllResource(@Query('page') page: number = 1): Promise<[Resource[], number]> {
        return this.resourceService.getAllResource(page);
    }

    @Get('/vin')
    @ApiOperation({summary: "리소스 & 와인 정보 목록 조회", description: "리소스 목록 (와인 정보 포함) 조회"})
    getResourceListWithVin(): Promise<Object> {
        return this.resourceService.getResourceListWithVin()
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
    @UseGuards(AuthGuard())
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

    @Get('/mypage')
    userResource(@GetUser() user: User): Promise<Resource[]> {
        return this.resourceService.userResource(user);
    }
}
