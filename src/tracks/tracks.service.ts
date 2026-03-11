import { Injectable } from '@nestjs/common';
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

  findOne(id: number): Promise<Track | null> {
    return this.trackRepository.findOneBy({ id })
  }

  async update(id: number, updateTrackDto: UpdateTrackDto): Promise<Track | null> {
    const { id: _ignored, ...rest } = updateTrackDto as any;
    const result = await this.trackRepository.update(id, rest);
    if (result.affected === 0) return null;
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.trackRepository.delete(id);
  }

  async findArtists(trackId: number): Promise<Artist[]> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['artists'],
    });
    return track?.artists ?? [];
  }

  async addArtist(trackId: number, artistId: number): Promise<Artist[] | null> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['artists'],
    });
    if (!track) return null;

    const artist = await this.artistRepository.findOne({ where: { id: artistId } });
    if (!artist) return null;

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
    if (!track) return null;

    track.artists = (track.artists ?? []).filter((a) => a.id !== artistId);
    await this.trackRepository.save(track);
    return track;
  }
}
