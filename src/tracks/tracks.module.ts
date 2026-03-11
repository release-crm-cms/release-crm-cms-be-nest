import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Track } from './entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Artist])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
