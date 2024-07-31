import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from '../../src/resource/resource.service';
import { Repository } from 'typeorm';
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

    describe('리소스 전체 조회: getAllResource', () => {
        let resource: Resource;
        let spyFn: any;
        beforeEach(async () => {
            resource = new Resource();
            spyFn = jest.spyOn(resourceRepository, 'findAndCount').mockResolvedValueOnce([[resource], 1])
        })

        it('getAllResource 는 함수여야 합니다.', () => {
            const result = resourceService.getAllResource;
            expect(typeof result).toBe('function');
        })

        it('resourceService.getAllResource 는 resourceRepository의 getALLResource를 호출해야 합니다.', async () => {
            const result = await resourceService.getAllResource();
            expect(spyFn).toBeCalled();
            expect(spyFn).toBeCalledTimes(1);
            expect(spyFn).toBeCalledWith({"skip": 5, "take": 5});
            expect(result).toStrictEqual([[resource],1]);
            expect(result).toBeInstanceOf(Object);
        });
    });
});
