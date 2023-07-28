import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseEnumPipe,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { favsEndpoints } from 'src/utils/favsEndpoints';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) { }

  @Get()
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post(':subpoint/:id')
  async addToFavs(
    @Param('subpoint', new ParseEnumPipe(favsEndpoints)) subpoint: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.favsService.addToFavs(subpoint, id);
  }

  @HttpCode(204)
  @Delete(':subpoint/:id')
  async remove(
    @Param('subpoint', new ParseEnumPipe(favsEndpoints)) subpoint: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.favsService.deleteFromFavs(subpoint, id);
  }
}
