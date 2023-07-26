import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { artistDB, trackDB } from 'src/database/db';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const artist = new Artist(name, grammy);
    artistDB.addOne(artist);
    return artist;
  }

  findAll() {
    return artistDB.getAll();
  }

  findOne(id: string) {
    const artist = artistDB.findbyID(id);
    if (!artist) throw new NotFoundException();
    return artistDB.findbyID(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = artistDB.findbyID(id);
    if (!artist) throw new NotFoundException();
    return artist.update(updateArtistDto);
  }

  remove(id: string) {
    const artist = artistDB.findbyID(id);
    if (!artist) throw new NotFoundException();
    artistDB.deleteOne(id);
    trackDB.getAll().forEach(tr => {
      if (tr.artistId === id) tr.artistId = null
    })
    return artist;
  }
}
