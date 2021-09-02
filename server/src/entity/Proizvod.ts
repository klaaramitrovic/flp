import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StanjeProizvoda } from "./StanjeProizvoda";

@Entity()
export class Proizvod {


    @PrimaryGeneratedColumn()
    sifraPR: number;

    @Column()
    nazivPR: string;

    @Column()
    cenaPR: number;


    @OneToMany(s => StanjeProizvoda, s => s.proizvod, { eager: true, onDelete: 'CASCADE' })
    stanja: StanjeProizvoda[];
}