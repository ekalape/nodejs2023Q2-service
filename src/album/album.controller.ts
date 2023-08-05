import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) throw new NotFoundException();
    return album;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    let album;
    try {
      album = await this.albumService.update(id, updateAlbumDto);
    } catch (err) {
      if (err instanceof Error) throw new NotFoundException();
      else throw err;
    }

    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    let album = null;
    try {
      album = await this.albumService.remove(id);
    } catch (err) {
      if (err instanceof Error) throw new NotFoundException();
      else throw err;
    }
    return album;
  }
}
