import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DatabaseService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    return await this.db.album.create({ data: createAlbumDto });
  }

  async findAll() {
    return await this.db.album.findMany();
  }

  async findOne(id: string) {
    return await this.db.album.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.db.album.update({
      where: {
        id,
      },
      data: updateAlbumDto,
    });
  }

  async remove(id: string) {
    return await this.db.album.delete({
      where: {
        id,
      },
    });
  }
}
