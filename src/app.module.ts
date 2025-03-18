import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from 'src/product/product.entity';
import { OriginService } from './origin/origin.service';
import { OriginController } from './origin/origin.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite.db', // SQLite database file
      entities: [Product], // Register your entities here
      synchronize: true, // Automatically create database schema (only for development)
    }),
    ProductModule,
  ],
  controllers: [AppController, OriginController],
  providers: [AppService, OriginService],
})
export class AppModule {}
