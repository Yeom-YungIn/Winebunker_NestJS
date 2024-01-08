import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from '../../src/resource/resource.service';
import {Repository} from 'typeorm';
import { Resource } from '../../src/resource/entity/resource.entity';
import {getRepositoryToken} from "@nestjs/typeorm";

describe('ResourceService', () => {
    let resourceService: ResourceService;
    let resourceRepository: Repository<Resource>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ResourceService,
                {
                    provide: getRepositoryToken(Resource),
                    useClass: Repository,
                },
            ],
        }).compile();

        resourceService = module.get<ResourceService>(ResourceService);
        resourceRepository = module.get<Repository<Resource>>(getRepositoryToken(Resource));
    });



    it('should be defined', () => {
        expect(resourceService).toBeDefined();
        expect(resourceRepository).toBeDefined();
    });



    describe('getAllResource', () => {
        let resource;
        beforeEach(async () => {
            resource = new Resource();
        })

        it('getAllResource to be function', () => {
            const result = resourceService.getAllResource;
            expect(typeof result).toBe('function');
        })

        it('resourceService.getAllResource should call resourceRepoitory.getALLResource', async () => {
            const spyFn = jest.spyOn(resourceService, 'getAllResource').mockResolvedValueOnce([[resource], 1])
            const result = await resourceService.getAllResource();
            expect(spyFn).toBeCalled();
            expect(spyFn).toBeCalledTimes(1);
            expect(spyFn).toBeCalledWith();
            expect(result).toStrictEqual([[resource],1]);
        });
    });
});
