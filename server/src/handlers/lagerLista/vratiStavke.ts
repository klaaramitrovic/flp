import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { StavkaLagerListe } from "../../entity/StavkaLagerListe";


export async function vratiStavke(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.sendStatus(400);
        return;
    }
    const stavke = await getRepository(StavkaLagerListe).find({

        where: {
            lagerLista: {
                sifraLL: id
            }
        }
    });
    res.json(stavke);
}