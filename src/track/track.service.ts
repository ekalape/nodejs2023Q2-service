import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    this.db.trackDB.addOne(track);
    return track;
  }

  async findAll() {
    return this.db.trackDB.getAll();
  }

  async findOne(id: string) {
    const track = this.db.trackDB.findbyID(id);
    if (!track) throw new NotFoundException();
    return this.db.trackDB.findbyID(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.trackDB.findbyID(id);
    if (!track) throw new NotFoundException();
    return track.update(updateTrackDto);
  }

  async remove(id: string) {
    const track = this.db.trackDB.findbyID(id);
    if (!track) throw new NotFoundException();
    this.db.trackDB.deleteOne(id);

    const favTrack = await this.favsService.findOne(favsEndpoints.TRACK, id);

    if (favTrack)
      await this.favsService.deleteFromFavs(favsEndpoints.TRACK, id);

    return track;
  }
}
