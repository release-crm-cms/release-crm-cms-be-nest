import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'release_crm_cms',
      entities: [],
      synchronize: true, // TODO: `synchronize: true` shouldn't be used in production - otherwise you can lose production data.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
