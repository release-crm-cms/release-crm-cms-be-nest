import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: EntityRepository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = this.trackRepository.create(createTrackDto);
    await this.trackRepository.persistAndFlush(track);
    return track;
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.findAll();
  }

  async findOne(id: number): Promise<Track | null> {
    return this.trackRepository.findOne({ id });
  }

  async update(id: number, updateTrackDto: UpdateTrackDto): Promise<Track | null> {
    const track = await this.trackRepository.findOne({ id });
    if (!track) {
      return null;
    }

    const { id: _ignored, ...rest } = updateTrackDto as any;
    this.trackRepository.assign(track, rest);
    await this.trackRepository.flush();
    return track;
  }

  async remove(id: number): Promise<void> {
    const track = await this.trackRepository.findOne({ id });
    if (!track) {
      return;
    }
    await this.trackRepository.removeAndFlush(track);
  }
}
