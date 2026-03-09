import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
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
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) return null;
    const updatedArtist = this.artistRepository.merge(artist, updateArtistDto);
    return await this.artistRepository.save(updatedArtist);
  }

  async remove(id: number): Promise<void> {
    await this.artistRepository.delete(id);
  }
}
