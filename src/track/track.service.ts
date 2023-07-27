import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { trackDB } from 'src/database/db';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class TrackService {
  constructor(private readonly favsService: FavsService) {}
  create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    trackDB.addOne(track);
    return track;
  }

  findAll() {
    return trackDB.getAll();
  }

  findOne(id: string) {
    const track = trackDB.findbyID(id);
    if (!track) throw new NotFoundException();
    return trackDB.findbyID(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = trackDB.findbyID(id);
    if (!track) throw new NotFoundException();
    return track.update(updateTrackDto);
  }

  remove(id: string) {
    const track = trackDB.findbyID(id);
    if (!track) throw new NotFoundException();
    trackDB.deleteOne(id);

    try {
      this.favsService.deleteFromFavs('track', id);
    } catch (e) {}
    return track;
  }
}
