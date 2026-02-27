import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { NotFoundException } from '@nestjs/common';

describe('EpisodesController', () => {
  let episodeController: EpisodesController;
  let episodeService: jest.Mocked<EpisodesService>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodesController],
      providers: [
        {
          provide: EpisodesService,
          useValue: episodeService,
        },
      ],
    }).compile();

    episodeController = module.get<EpisodesController>(EpisodesController);
    episodeService = module.get(EpisodesService);
  });

  //check controller episode controller is defined
  it('should be defined', () => {
    expect(episodeController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all episodes', async () => {
      const mockEpisodes = [];
      episodeService.findAll.mockResolvedValue(mockEpisodes);

      const result = await episodeController.findAll();

      expect(episodeService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockEpisodes);
    });
  });

  describe('findOne', () => {
    it('should return an episode by id', async () => {
      const episodeId = 'id';
      const mockEpisode = { id: episodeId, name: 'my episode' };

      episodeService.findOne.mockResolvedValue(mockEpisode);

      const result = await episodeController.findOne(episodeId);

      expect(episodeService.findOne).toHaveBeenCalledWith(episodeId);
      expect(result).toEqual(mockEpisode);
    });

    it('should throw an error if episode is not found', async () => {
      const episodeId = 'non-existent';
      episodeService.findOne.mockResolvedValue(null);

      await expect(episodeController.findOne(episodeId)).rejects.toThrow(
        `Episode with ID: ${episodeId} not found`,
      );
    });
  });

  describe('create', () => {
    it('should create a new episode', async () => {
      const dto = {
        title: 'new episode',
        description: 'description of new episode',
        duration: 100,
        podcastId: 'podcastId',
        publishedAt: new Date(),
        audioUrl: 'audioUrl',
      };
      const mockResult = { id: 'id', ...dto };

      episodeService.create.mockResolvedValue(mockResult);

      const result = await episodeController.create(dto);

      expect(episodeService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('delete', () => {
    it('should delete an episode by id', async () => {
      const episodeId = 'id';
      episodeService.delete.mockResolvedValue(undefined);

      const result = await episodeController.delete(episodeId);

      expect(episodeService.delete).toHaveBeenCalledWith(episodeId);
      expect(result).toBeUndefined();
    });

    it('should throw an error if service throws an error', async () => {
      episodeService.delete.mockRejectedValue(new Error('Episode not found'));

      await expect(episodeController.delete('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an episode by id', async () => {
      const episodeId = 'id';
      const dto = {
        title: 'updated episode',
      };
      const mockResult = {
        id: episodeId,
        ...dto,
      };

      episodeService.update.mockResolvedValue({ id: episodeId, ...dto });

      const result = await episodeController.update(episodeId, dto);

      expect(episodeService.update).toHaveBeenCalledWith(episodeId, dto);
      expect(result).toEqual(mockResult);
    });

    it('should throw an error if service throws an error', async () => {
      const episodeId = 'non-existent';
      const dto = {
        title: 'updated episode',
      };
      episodeService.update.mockRejectedValue(new Error('Episode not found'));

      await expect(episodeController.update(episodeId, dto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
