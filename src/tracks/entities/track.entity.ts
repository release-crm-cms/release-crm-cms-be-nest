import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Track {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  artistString!: string;

  @Property()
  year!: number;
}
