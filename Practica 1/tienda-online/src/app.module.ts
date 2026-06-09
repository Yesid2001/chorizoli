import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { OrdenProductoModule } from './orden-producto/orden-producto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://tienda_onilne_user:EwolOFIvKkMSC1PVuD1z9ELy3a868d4B@dpg-d8j4chc8aovs738trmmg-a.virginia-postgres.render.com/tienda_onilne',
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    ClientesModule,
    CategoriasModule,
    ProductosModule,
    OrdenesModule,
    OrdenProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}