import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>
  ) { }

  create(createTrackDto: CreateTrackDto) {
    return 'This action adds a new track';
  }

  findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  findOne(id: number): Promise<Track | null> {
    return this.trackRepository.findOneBy({ id })
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  async remove(id: number): Promise<void> {
    await this.trackRepository.delete(id);
  }
}
