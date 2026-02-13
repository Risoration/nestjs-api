import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call authService register and return result', async () => {
      const dto = {
        name: 'test user',
        email: 'email@email.com',
        password: 'password123',
      };

      const mockResult = {
        id: '1',
        email: dto.email,
        name: dto.email,
      };

      service.register.mockResolvedValue(mockResult as any);

      const result = await controller.register(dto);

      expect(service.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('login', () => {
    it('should call authService login and return result', async () => {
      const dto = {
        email: 'email@email.com',
        password: 'password123',
      };

      const mockToken = {
        access_token: 'jwt_token',
      };

      service.login.mockResolvedValue(mockToken as any);

      const token = await controller.login(dto);

      expect(service.login).toHaveBeenCalledWith(dto);
      expect(token).toEqual(mockToken);
    });
  });
});
