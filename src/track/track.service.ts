import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { trackDB } from 'src/database/db';
import { FavsService } from 'src/favs/favs.service';
import { favsDB } from 'src/database/favsDB';

@Injectable()
export class TrackService {
  constructor(private readonly favsService: FavsService) { }
  async create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    trackDB.addOne(track);
    return track;
  }

  async findAll() {
    return trackDB.getAll();
  }

  async findOne(id: string) {
    const track = trackDB.findbyID(id);
    if (!track) throw new NotFoundException();
    return trackDB.findbyID(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = trackDB.findbyID(id);
    if (!track) throw new NotFoundException();
    return track.update(updateTrackDto);
  }

  async remove(id: string) {
    const track = trackDB.findbyID(id);
    if (!track) throw new NotFoundException();
    trackDB.deleteOne(id);


    const favTrack = favsDB.findTrack(id)
    if (favTrack) await this.favsService.deleteFromFavs('track', id);

    return track;
  }
}
