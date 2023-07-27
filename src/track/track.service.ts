import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { trackDB } from 'src/database/db';

@Injectable()
export class TrackService {
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
    return track;
  }
}
