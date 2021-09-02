import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { SefMagacina } from './SefMagacina';

@Entity()
export class Magacin {

    @PrimaryGeneratedColumn()
    sifraMagacina: number;

    @Column()
    naziv: string;

    @OneToOne(t => SefMagacina, sef => sef.magacin)
    @JoinColumn({
        referencedColumnName: 'sifraSM',
        name: 'sifraSM'
    })
    sefMagacina: SefMagacina
}