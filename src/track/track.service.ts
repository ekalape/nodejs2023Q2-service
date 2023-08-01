import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { FavsService } from 'src/favs/favs.service';
import { DatabaseService } from 'src/database/database.service';
import { favsEndpoints } from 'src/utils/favsEndpoints';

@Injectable()
export class TrackService {
  constructor(
    private readonly favsService: FavsService,
    private readonly db: DatabaseService,
  ) { }
  async create(createTrackDto: CreateTrackDto) {
    /*     const track = new Track(createTrackDto);
        this.db.trackDB.addOne(track);
        return track; */
    return this.db.track.create({ data: createTrackDto })
  }

  async findAll() {
    return this.db.track.findMany();
  }

  async findOne(id: string) {
    return this.db.track.findUnique({
      where: {
        id
      }
    })
    /*     const track = this.db.trackDB.findbyID(id);
        if (!track) return null;
        return this.db.trackDB.findbyID(id); */
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.db.track.update({
      where: {
        id
      },
      data: updateTrackDto
    })
    /*     const track = this.db.trackDB.findbyID(id);
        if (!track) return null;
        return track.update(updateTrackDto); */
  }

  async remove(id: string) {
    return this.db.track.delete({
      where: {
        id
      }
    })
    /*     const track = this.db.trackDB.findbyID(id);
        if (!track) return null;
        this.db.trackDB.deleteOne(id);
    
        const favTrack = await this.favsService.findOne(favsEndpoints.TRACK, id);
    
        if (favTrack)
          await this.favsService.deleteFromFavs(favsEndpoints.TRACK, id);
    
        return track; */
  }
}
