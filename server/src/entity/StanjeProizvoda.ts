import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Proizvod } from "./Proizvod";

@Entity()
export class StanjeProizvoda {

    @PrimaryGeneratedColumn()
    redniBrojSP: number;

    @Column()
    kolicina: number

    @PrimaryColumn()
    proizvodId: number;

    @ManyToOne(t => Proizvod)
    @JoinColumn({
        name: 'proizvodId',
        referencedColumnName: 'sifraPR'
    })
    proizvod: Proizvod
}