import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albumDB, trackDB } from 'src/database/db';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);
    albumDB.addOne(album);
    return album;
  }

  findAll() {
    return albumDB.getAll();
  }

  findOne(id: string) {
    const album = albumDB.findbyID(id);
    if (!album) throw new NotFoundException();
    return albumDB.findbyID(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = albumDB.findbyID(id);
    if (!album) throw new NotFoundException();
    return album.update(updateAlbumDto);
  }

  remove(id: string) {
    const album = albumDB.findbyID(id);
    if (!album) throw new NotFoundException();
    albumDB.deleteOne(id);
    trackDB.getAll().forEach((tr) => {
      if (tr.albumId === id) tr.albumId = null;
    });
    return album;
  }
}
