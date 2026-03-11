import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { Artist } from '../artists/entities/artist.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) { }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(track);
  }

  findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async findOne(id: number): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  async update(id: number, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const { id: _ignored, ...rest } = updateTrackDto as any;
    const result = await this.trackRepository.update(id, rest);
    if (result.affected === 0) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }

  async findArtists(trackId: number): Promise<Artist[]> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['artists'],
    });
    if (!track) {
      throw new NotFoundException(`Track with id ${trackId} not found`);
    }
    return track.artists ?? [];
  }

  async addArtist(trackId: number, artistId: number): Promise<Artist[] | null> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['artists'],
    });
    if (!track) {
      throw new NotFoundException(`Track with id ${trackId} not found`);
    }

    const artist = await this.artistRepository.findOne({ where: { id: artistId } });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${artistId} not found`);
    }

    const alreadyLinked = track.artists?.some((a) => a.id === artist.id);
    if (!alreadyLinked) {
      track.artists = [...(track.artists ?? []), artist];
      await this.trackRepository.save(track);
    }
    return this.findArtists(trackId);
  }

  async removeArtist(trackId: number, artistId: number): Promise<Track | null> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['artists'],
    });
    if (!track) {
      throw new NotFoundException(`Track with id ${trackId} not found`);
    }

    track.artists = (track.artists ?? []).filter((a) => a.id !== artistId);
    await this.trackRepository.save(track);
    return track;
  }
}
