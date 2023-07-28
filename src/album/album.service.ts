import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albumDB, trackDB } from 'src/database/db';
import { Album } from './entities/album.entity';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class AlbumService {
  constructor(private readonly favsService: FavsService) { }
  async create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);
    albumDB.addOne(album);
    return album;
  }

  async findAll() {
    return albumDB.getAll();
  }

  async findOne(id: string) {
    const album = albumDB.findbyID(id);
    if (!album) throw new NotFoundException();
    return albumDB.findbyID(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = albumDB.findbyID(id);
    if (!album) throw new NotFoundException();
    return album.update(updateAlbumDto);
  }

  async remove(id: string) {
    const album = albumDB.findbyID(id);
    if (!album) throw new NotFoundException();
    albumDB.deleteOne(id);
    trackDB.getAll().forEach((tr) => {
      if (tr.albumId === id) tr.albumId = null;
    });

    const favAlbum = await this.favsService.findOne("album", id)
    if (favAlbum) await this.favsService.deleteFromFavs('album', id);

    return album;
  }
}
