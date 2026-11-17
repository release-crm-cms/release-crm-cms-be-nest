import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Artist {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  legalName!: string;

  @Property({ nullable: true })
  bio?: string;

  @Property({ nullable: true })
  image?: string;

  @Property({ nullable: true })
  website?: string;

  @Property({ nullable: true })
  email?: string;

  @Property({ nullable: true })
  phone?: string;
}
