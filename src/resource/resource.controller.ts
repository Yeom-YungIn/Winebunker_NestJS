import {Body, Controller, Delete, Get, ParseUUIDPipe, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {ResourceService} from "./resource.service";
import {ResourceDto} from "./dto/resource.dto";
import {Resource} from "./entity/resource.entity";
import {AuthGuard} from "@nestjs/passport";
import {User} from "../auth/entity/user.entity";
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import {GetUser, ResourceObjValidatePipe} from "@app/common";


const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

@ApiTags('리소스 API')
@Controller('resource')
@UseGuards(AuthGuard())
export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService
    ) {
    }

    @Get()
    @ApiOperation({summary: "리소스 목록 조회", description: "리소스 데이터만 조회"})
    getAllResource(@Query('page') page: number = 1): Promise<[Resource[], number]> {
        console.time('cache test')
        const key: string = 'resource';
        const cachedResource = cache.get(key);
        if (cachedResource) {
            return cachedResource;
        } else {
            const result:  Promise<[Resource[], number]> = this.resourceService.getAllResource(page);
            cache.set(key, result);
            return result;
        }
    }

    @Get('/vin/list')
    @ApiOperation({summary: "리소스 & 와인 정보 목록 조회", description: "리소스 목록 (와인 정보 포함) 조회"})
    getResourceListWithVin(): Promise<Object> {
        const start = Date.now()
        const key: string = 'resource';
        const cachedResource = cache.get(key);
        if (cachedResource) {
            const end = Date.now();
            return cachedResource;
        } else {
            const result: Promise<Object> = this.resourceService.getResourceListWithVin()
            cache.set(key, result, 60);
            const end = Date.now();
            return result;
        }
    }

    @Get('/get')
    getResource(@Query('id', ParseUUIDPipe) id: string): Promise<Resource> {
        return this.resourceService.getResource(id);
    }

    @Get('/search')
    searchResource(@Query('searchVal') searchVal: string): Promise<Resource[]> {
        return this.resourceService.searchResource(searchVal);
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
