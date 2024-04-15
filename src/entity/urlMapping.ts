import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UrlMapping {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true,
        nullable: false,

    })
    originalUrl!: string;

    @Column({
        unique: true,
        nullable: false,
    })
    shortId!: string;
}
