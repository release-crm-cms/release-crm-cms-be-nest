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

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(track);
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
