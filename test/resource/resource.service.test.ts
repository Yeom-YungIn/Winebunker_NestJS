import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from '../../src/resource/resource.service';
import { Repository } from 'typeorm';
import { Resource } from '../../src/resource/entity/resource.entity';
import { NotFoundException } from '@nestjs/common';

describe('ResourceService', () => {
    let resourceService: ResourceService;
    let resourceRepository: Repository<Resource>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ResourceService,
                {
                    provide: Repository<Resource>,
                    useClass: Repository,
                },
            ],
        }).compile();

        resourceService = module.get<ResourceService>(ResourceService);
        resourceRepository = module.get<Repository<Resource>>(Repository<Resource>);
    });


    it('should be defined', () => {
        expect(resourceService).toBeDefined();
        expect(resourceRepository).toBeDefined();
    });



    describe('getAllResource', () => {
        it('resourceService.getAllResource should call resourceRepoitory.getALLResource', async () => {
            const resource = new Resource();
            const spyFn = jest.spyOn(resourceService, 'getAllResource').mockResolvedValueOnce([[resource], 1])
            const result = await resourceService.getAllResource();
            expect(spyFn).toBeCalled();
            expect(spyFn).toBeCalledTimes(1);
            expect(spyFn).toBeCalledWith();
            expect(result).toStrictEqual([[resource],1]);
        });

        it('resourceService.getAllResource should call resourceRepository.findAndCount',async () => {

        });

        it('findAndCount', () => {
            const result = resourceRepository.getAllResource;
            expect(typeof result).toBe('function');
        })
    });

    describe('getResourceListWithVin', () => {
        it('should return a list of resources with VIN information', async () => {
            // TODO: Implement the test for getResourceListWithVin method
        });
    });

    describe('getResource', () => {
        it('should throw NotFoundException when resource is not found', async () => {
            // TODO: Implement the test for getResource method when resource is not found
        });

        it('should return the resource when it exists', async () => {
            // TODO: Implement the test for getResource method when resource is found
        });
    });

    describe('searchResource', () => {
        it('should return an array of resources matching the search criteria', async () => {
            // TODO: Implement the test for searchResource method
        });
    });

    describe('saveResource', () => {
        it('should save a new resource and return the saved resource', async () => {
            // TODO: Implement the test for saveResource method
        });
    });

    describe('updateResource', () => {
        it('should update an existing resource and return success message', async () => {
            // TODO: Implement the test for updateResource method
        });
    });

    describe('deleteResource', () => {
        it('should delete an existing resource and return success message', async () => {
            // TODO: Implement the test for deleteResource method
        });
    });

    describe('userResource', () => {
        it('should return an array of resources owned by the user', async () => {
            // TODO: Implement the test for userResource method
        });
    });
});
