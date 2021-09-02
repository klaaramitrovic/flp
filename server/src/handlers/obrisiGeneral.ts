import { Request, Response } from "express";
import { getRepository } from "typeorm";

export function obrisiGeneral<T>(domKlasa: any, validator?: (val: T) => boolean) {
    return async function (req: Request, res: Response) {
        const id = Number(req.params.id);
        const obj = await getRepository(domKlasa).findOne(id) as T;
        if (!obj) {
            res.sendStatus(404);
            return;
        }
        if (validator && !validator(obj)) {
            res.sendStatus(400);
            return;
        }
        try{ await getRepository(domKlasa).delete(id);
            res.sendStatus(204);} catch(error){res.sendStatus(400)}
       
    }
}