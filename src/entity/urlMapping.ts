import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm";

@Entity()
export class UrlMapping {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true,
        nullable: false,
    })
    originalUrl!: string;

    @Index({unique: true})
    @Column({
        unique: true,
        nullable: false,
    })
    shortId!: string;
}
