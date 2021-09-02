import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Centrala } from "./Centrala";
import { SefMagacina } from "./SefMagacina";
import { StavkaLagerListe } from "./StavkaLagerListe";

@Entity()
export class LagerLista {

    @PrimaryGeneratedColumn()
    sifraLL: number;

    @Column()
    nazivLL: string

    @Column()
    datumSlanja: Date;


    @ManyToOne(t => Centrala, { eager: true })
    centrala: Centrala;

    @ManyToOne(t => SefMagacina, { eager: true })
    sefMagacina: SefMagacina;

    @Column()
    stanje: 'kreirana' | 'izmenjena' | 'potpisana';

    @OneToMany(t => StavkaLagerListe, s => s.lagerLista)
    stavke: StavkaLagerListe[]
}