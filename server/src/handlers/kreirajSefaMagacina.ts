import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { SefMagacinaDTO } from "../dto";
import { Magacin } from "../entity/Magacin";
import { SefMagacina } from "../entity/SefMagacina";




export async function kreirajSefaMagacina(req: Request, res: Response) {

    const data = req.body as SefMagacinaDTO;

    const noviSef = await getManager().transaction(async manager => {
        const sef = await manager.save(SefMagacina, {
            imeSM: data.imeSM,
            prezimeSM: data.prezimeSM,

        }) as SefMagacina;
        if (data.magacin) {
            const updateResult = await manager.update(Magacin, data.magacin, {
                sefMagacina: {
                    sifraSM: sef.sifraSM
                }
            });


        }

        return sef;

    })

    res.json({
        sifraSM: noviSef.sifraSM
    })
}