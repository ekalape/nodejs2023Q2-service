import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { albumDB, artistDB, trackDB } from 'src/database/db';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class ArtistService {
  constructor(private readonly favsService: FavsService) { }
  async create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const artist = new Artist(name, grammy);
    artistDB.addOne(artist);
    return artist;
  }

  async findAll() {
    return artistDB.getAll();
  }

  async findOne(id: string) {
    const artist = artistDB.findbyID(id);
    if (!artist) throw new NotFoundException();
    return artistDB.findbyID(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = artistDB.findbyID(id);
    if (!artist) throw new NotFoundException();
    return artist.update(updateArtistDto);
  }

  async remove(id: string) {
    const artist = artistDB.findbyID(id);
    if (!artist) throw new NotFoundException();
    artistDB.deleteOne(id);
    trackDB.getAll().forEach((tr) => {
      if (tr.artistId === id) tr.artistId = null;
    });
    albumDB.getAll().forEach((a) => {
      if (a.artistId === id) a.artistId = null;
    });
    const favArtist = await this.favsService.findOne("artist", id)
    console.log("artist fount ---> ", favArtist)
    if (favArtist) await this.favsService.deleteFromFavs('artist', id);

    return artist;
  }
}
