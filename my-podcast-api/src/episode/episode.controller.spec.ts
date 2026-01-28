import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episode.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episode.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindAll = jest.fn();
  const mockFindFeatured = jest.fn();
  const mockFindOne = jest.fn();
  const mockCreate = jest.fn();
  const mockDelete = jest.fn();
  const mockUpdate = jest.fn();

  const mockEpisodesService = {
    findAll: mockFindAll,
    findFeatured: mockFindFeatured,
    findOne: mockFindOne,
    create: mockCreate,
    delete: mockDelete,
    update: mockUpdate,
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  //check controller episode controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const episodeList = [];
    const mockResult = episodeList;

    beforeEach(() => {
      mockFindAll.mockResolvedValue(mockResult);
    });

    it('should return correct response', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(mockResult);
    });
  });

  // findOne tests
  describe('findOne', () => {
    describe('when episode with ID is found', () => {
      const episodeId = 'id';
      const mockResult = { id: episodeId, name: 'my episode' };

      //reset mock before each test
      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult);
      });

      it('should call the service with correct params', async () => {
        await controller.findOne(episodeId);
        expect(mockFindOne).toHaveBeenCalledWith(episodeId);
      });

      it('should return correct response', async () => {
        const result = await controller.findOne(episodeId);
        expect(result).toEqual(mockResult);
      });
    });
  });

  describe('when episode with ID is not found', () => {
    const episodeId = 'id2';
    beforeEach(() => {
      mockFindOne.mockResolvedValue(null);
    });

    it('should throw an error', async () => {
      await expect(controller.findOne(episodeId)).rejects.toThrow(
        `Episode with ID: ${episodeId} not found`,
      );
    });
  });
});
