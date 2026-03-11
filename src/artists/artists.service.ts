import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) { }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  findOne(id: number): Promise<Artist | null> {
    return this.artistRepository.findOneBy({ id });
  }

  async update(id: number, updateArtistDto: UpdateArtistDto): Promise<Artist | null> {
    const { id: _ignored, ...rest } = updateArtistDto as any;
    const result = await this.artistRepository.update(id, rest);
    if (result.affected === 0) return null;
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.artistRepository.delete(id);
  }

  async findTracks(artistId: number): Promise<Track[]> {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
      relations: ['tracks'],
    });
    return artist?.tracks ?? [];
  }
}
