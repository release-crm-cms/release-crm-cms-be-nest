import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    legalName: string;

    @Column({ nullable: true })
    bio: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;
}
