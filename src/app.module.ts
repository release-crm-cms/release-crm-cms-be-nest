import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksModule } from './tracks/tracks.module';
import { Track } from './tracks/entities/track.entity';
import { ArtistsModule } from './artists/artists.module';
import { Artist } from './artists/entities/artist.entity';
import config from './mikro-orm.config'; // your ORM config

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    // TracksModule,
    // ArtistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
