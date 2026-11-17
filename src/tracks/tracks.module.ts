import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Track } from './entities/track.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Track] })],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
