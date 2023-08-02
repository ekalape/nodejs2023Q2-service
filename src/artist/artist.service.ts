import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DatabaseService) {}
  async create(createArtistDto: CreateArtistDto) {
    return await this.db.artist.create({ data: createArtistDto });
  }

  async findAll() {
    return await this.db.artist.findMany();
  }

  async findOne(id: string) {
    return await this.db.artist.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return await this.db.artist.update({
      where: {
        id,
      },
      data: updateArtistDto,
    });
  }

  async remove(id: string) {
    return await this.db.artist.delete({
      where: {
        id,
      },
    });
  }
}
