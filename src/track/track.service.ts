import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TrackService {
  constructor(private readonly db: DatabaseService) {}
  async create(createTrackDto: CreateTrackDto) {
    return await this.db.track.create({ data: createTrackDto });
  }

  async findAll() {
    return await this.db.track.findMany();
  }

  async findOne(id: string) {
    return await this.db.track.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.db.track.update({
      where: {
        id,
      },
      data: updateTrackDto,
    });
  }

  async remove(id: string) {
    return await this.db.track.delete({
      where: {
        id,
      },
    });
  }
}
