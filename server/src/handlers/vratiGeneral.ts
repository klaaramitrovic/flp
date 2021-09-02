import { Request, Response } from "express";
import { getRepository } from "typeorm";

export function vratiGeneral(domKlasa: any) {
    return async function (req: Request, res: Response) {
        const data = await getRepository(domKlasa).find();
        res.json(data);
    }
}