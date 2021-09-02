import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { LagerListaDTO } from "../../dto";
import { LagerLista } from "../../entity/LagerLista";
import { Proizvod } from "../../entity/Proizvod";
import { StavkaLagerListe } from "../../entity/StavkaLagerListe";
import { pripremiStavkuZaSave, pripremiZaSave } from "./lagerListaUtil";

export async function kreirajLL(req: Request, res: Response) {

    const data = req.body as LagerListaDTO;
    console.log(data);
    const kreiranaLagerLista = await getManager().transaction(async manager => {

        const lagerLista = await manager.save(LagerLista, {
            ...pripremiZaSave(data),
            stanje: 'kreirana'
        }) as LagerLista;

        for (let stavkaDTO of data.stavke || []) {
            const proizvod = await manager.findOne(Proizvod, stavkaDTO.proizvodId);
            if (!proizvod) {
                throw Error('proizvod ne postoji');
            }
            const kolicina = (proizvod.stanja || []).reduce((prev, curr) => {
                return prev + curr.kolicina;
            }, 0)
            console.log('kreirajStavku')
            await manager.save(StavkaLagerListe, {
                ...pripremiStavkuZaSave(stavkaDTO, lagerLista),
                stanjeSLL: kolicina,
                sifraSLL: undefined,
                iznosSLL: proizvod.cenaPR * kolicina
            }) as StavkaLagerListe

        }
        return lagerLista;
    })

    res.json(await getRepository(LagerLista).findOne(kreiranaLagerLista.sifraLL));
}