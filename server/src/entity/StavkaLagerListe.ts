import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LagerLista } from "./LagerLista";
import { Proizvod } from "./Proizvod";

@Entity()
export class StavkaLagerListe {

    @PrimaryGeneratedColumn()
    sifraSLL: number;

    @Column()
    iznosSLL: number;

    @Column()
    stanjeSLL: number;



    @ManyToOne(t => Proizvod, { eager: true })
    proizvod: Proizvod;

    @ManyToOne(t => LagerLista, { primary: true, onDelete: 'CASCADE' })
    lagerLista: LagerLista;
}