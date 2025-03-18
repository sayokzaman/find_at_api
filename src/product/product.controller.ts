import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductDto } from 'src/product/product.dto';
import { ProductService } from 'src/product/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() product: ProductDto) {
    return this.productService.create(product);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProduct: ProductDto) {
    return this.productService.update(id, updateProduct);
  }

  @Delete(':id')
  @HttpCode(204)
  destroy(@Param('id') id: number) {
    return this.productService.destroy(id);
  }
}
