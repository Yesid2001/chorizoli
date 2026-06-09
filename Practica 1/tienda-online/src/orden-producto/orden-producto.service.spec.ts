import { Test, TestingModule } from '@nestjs/testing';
import { OrdenProductoService } from './orden-producto.service';

describe('OrdenProductoService', () => {
  let service: OrdenProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenProductoService],
    }).compile();

    service = module.get<OrdenProductoService>(OrdenProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
