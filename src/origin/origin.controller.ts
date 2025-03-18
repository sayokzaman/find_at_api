import { Controller, Get, Query } from '@nestjs/common';
import { OriginService } from './origin.service';

@Controller('origin')
export class OriginController {
  constructor(private readonly originService: OriginService) {}

  @Get()
  async get(@Query('search') search?: string) {
    return this.originService.getData(search);
  }
}
