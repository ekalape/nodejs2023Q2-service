import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { FavsService } from 'src/favs/favs.service';
import { DatabaseService } from 'src/database/database.service';
import { favsEndpoints } from 'src/utils/favsEndpoints';

@Injectable()
export class AlbumService {
  constructor(
    private readonly favsService: FavsService,
    private readonly db: DatabaseService,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);
    this.db.albumDB.addOne(album);
    return album;
  }

  async findAll() {
    return this.db.albumDB.getAll();
  }

  async findOne(id: string) {
    const album = this.db.albumDB.findbyID(id);
    if (!album) return null;
    return this.db.albumDB.findbyID(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.albumDB.findbyID(id);
    if (!album) return null;
    return album.update(updateAlbumDto);
  }

  async remove(id: string) {
    const album = this.db.albumDB.findbyID(id);
    if (!album) return null;
    this.db.albumDB.deleteOne(id);
    this.db.trackDB.getAll().forEach((tr) => {
      if (tr.albumId === id) tr.albumId = null;
    });

    const favAlbum = await this.favsService.findOne(favsEndpoints.ALBUM, id);
    if (favAlbum)
      await this.favsService.deleteFromFavs(favsEndpoints.ALBUM, id);

    return album;
  }
}
