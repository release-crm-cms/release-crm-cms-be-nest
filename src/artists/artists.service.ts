import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
      private readonly artistRepository: EntityRepository<Artist>,
  ) { }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create(createArtistDto);
      await this.artistRepository.persistAndFlush(artist);
      return artist;
  }

  async findAll(): Promise<Artist[]> {
      return this.artistRepository.findAll();
  }

    async findOne(id: number): Promise<Artist | null> {
      return this.artistRepository.findOne({ id });
  }

  async update(id: number, updateArtistDto: UpdateArtistDto): Promise<Artist | null> {
      const artist = await this.artistRepository.findOne({ id });
      if (!artist) {
        return null;
      }

      const { id: _ignored, ...rest } = updateArtistDto as any;
      this.artistRepository.assign(artist, rest);
      await this.artistRepository.flush();
      return artist;
  }

  async remove(id: number): Promise<void> {
      const artist = await this.artistRepository.findOne({ id });
      if (!artist) {
        return;
      }
      await this.artistRepository.removeAndFlush(artist);
  }
}
