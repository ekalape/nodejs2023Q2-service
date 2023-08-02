import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Put,
  HttpCode,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    let artist;
    try {
      artist = await this.artistService.update(id, updateArtistDto);
    } catch (err) {
      if (err instanceof PrismaClientValidationError)
        throw new BadRequestException();
      else {
        throw new NotFoundException();
      }
    }

    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    let artist;
    try {
      artist = await this.artistService.remove(id);
    } catch (err) {
      if (err instanceof Error) throw new NotFoundException();
      else throw err;
    }
    return artist;
  }
}
