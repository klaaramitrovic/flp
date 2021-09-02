import { Request, Response } from "express";
import { FindConditions, getManager, getRepository } from "typeorm";
import { LagerListaDTO } from "../../dto";
import { LagerLista } from "../../entity/LagerLista";
import { Proizvod } from "../../entity/Proizvod";
import { StavkaLagerListe } from "../../entity/StavkaLagerListe";
import { pripremiStavkuZaSave, pripremiZaSave } from "./lagerListaUtil";

export async function izmeniLL(req: Request, res: Response) {
    const data = req.body as LagerListaDTO;
    const id = Number(req.params.id);

    const izmenjenaLL = await getManager().transaction(async manager => {

        const novaLagerLista = await manager.save(LagerLista, {
            ...pripremiZaSave(data),
            sifraLL: id,
            stanje: data.stanje,
        }) as any;
        for (let stavkaDTO of data.stavke) {
            if (stavkaDTO.obrisana) {
                await manager.delete(StavkaLagerListe, {
                    sifraSLL: stavkaDTO.sifraStavka,
                    lagerLista: {
                        sifraLL: id
                    }
                } as FindConditions<StavkaLagerListe>)
            } else {
                const proizvod = await manager.findOne(Proizvod, stavkaDTO.proizvodId);
                if (!proizvod) {
                    throw Error('proizvod ne postoji');
                }
                const kolicina = proizvod.stanja.reduce((prev, curr) => {
                    return prev + curr.kolicina;
                }, 0)
                await manager.save(StavkaLagerListe, {
                    ...pripremiStavkuZaSave(stavkaDTO, novaLagerLista),
                    sifraSLL: stavkaDTO.sifraStavka,
                    stanjeSLL: kolicina,
                    iznosSLL: proizvod.cenaPR * kolicina
                }) as StavkaLagerListe

            }
        }
        return novaLagerLista;
    })
    res.json(await getRepository(LagerLista).findOne(izmenjenaLL.sifraLL));
}