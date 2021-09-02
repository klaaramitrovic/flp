import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Magacin } from "./Magacin";


@Entity()
export class SefMagacina {


    @PrimaryGeneratedColumn()
    sifraSM: number;

    @Column()
    imeSM: string;

    @Column()
    prezimeSM: string;

    @OneToOne(t => Magacin, magacin => magacin.sefMagacina, { eager: true })
    magacin?: Magacin;
}