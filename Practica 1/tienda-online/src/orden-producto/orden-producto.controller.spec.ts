import { Test, TestingModule } from '@nestjs/testing';
import { OrdenProductoController } from './orden-producto.controller';

describe('OrdenProductoController', () => {
  let controller: OrdenProductoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenProductoController],
    }).compile();

    controller = module.get<OrdenProductoController>(OrdenProductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
