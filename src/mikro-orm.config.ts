import { defineConfig } from '@mikro-orm/postgresql';
import { Track } from './tracks/entities/track.entity';
import { Artist } from './artists/entities/artist.entity';

export default defineConfig({
  dbName: 'release_crm_cms',
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  entities: [Track, Artist],
  debug: true,
});

