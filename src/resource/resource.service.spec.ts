import {ResourceService} from "./resource.service";
import {Resource} from "./entity/resource.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {Repository} from "typeorm";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {typeORMConfig} from "../configs/typeorm.config";
import {ResourceModule} from "./resource.module";

describe('ResourceService', () => {
    let resourceService: ResourceService;
    let resourceRepository: Repository<Resource>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ResourceModule,
                TypeOrmModule.forRoot(typeORMConfig),
            ],
        }).compile();

        resourceService = module.get<ResourceService>(ResourceService);
        resourceRepository = module.get<Repository<Resource>>(getRepositoryToken(Resource));
    });

    it('should be define',() => {
        console.log(resourceService)
        console.log(resourceRepository)
        expect(resourceService).toBeDefined();
    })

    describe('getAllResource Test',() => {
        it('리소스 목록 조회', async () => {
            const mockResource = Array()
            const result: [Resource[], number] = await resourceService.getAllResource();
            expect(result).toEqual(mockResource);
        });
    })


})