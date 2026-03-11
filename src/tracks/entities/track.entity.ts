import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artistString: string;

  @Column()
  year: number;

  @ManyToMany(() => Artist, (artist) => artist.tracks)
  @JoinTable()
  artists: Artist[];
}
