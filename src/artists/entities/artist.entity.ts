import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    legalName: string;

    @Column()
    bio: string;

    @Column()
    image: string;

    @Column()
    website: string;

    @Column()
    email: string;
    
    @Column()
    phone: string;
}
