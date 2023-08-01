import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { FavsService } from 'src/favs/favs.service';
import { DatabaseService } from 'src/database/database.service';
import { favsEndpoints } from 'src/utils/favsEndpoints';

@Injectable()
export class ArtistService {
  constructor(
    private readonly favsService: FavsService,
    private readonly db: DatabaseService,
  ) { }
  async create(createArtistDto: CreateArtistDto) {
    /*     const { name, grammy } = createArtistDto;
        const artist = new Artist(name, grammy); */
    //this.db.artistDB.addOne(artist);
    return this.db.artist.create({ data: createArtistDto })
    //return artist;
  }

  async findAll() {
    return this.db.artist.findMany()
    // return this.db.artistDB.getAll();
  }

  async findOne(id: string) {
    return this.db.artist.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.db.artist.update({
      where: {
        id
      },
      data: updateArtistDto
    })
    /*     const artist = this.db.artistDB.findbyID(id);
        if (!artist) return null;
        return artist.update(updateArtistDto); */
  }

  async remove(id: string) {

    return this.db.artist.delete({
      where: {
        id
      }
    })
    /*  const artist = this.db.artistDB.findbyID(id);
     if (!artist) return null;
     this.db.artistDB.deleteOne(id);
     this.db.trackDB.getAll().forEach((tr) => {
       if (tr.artistId === id) tr.artistId = null;
     });
     this.db.albumDB.getAll().forEach((a) => {
       if (a.artistId === id) a.artistId = null;
     });
     const favArtist = await this.favsService.findOne(favsEndpoints.ARTIST, id);
     console.log('artist fount ---> ', favArtist);
     if (favArtist)
       await this.favsService.deleteFromFavs(favsEndpoints.ARTIST, id);
 
     return artist; */
  }
}
