import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Centrala {


    @PrimaryGeneratedColumn()
    sifraCentrale: number;

    @Column()
    nazivCentrale: string;
}