import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { Artist } from './entities/artist.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Artist] })],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
