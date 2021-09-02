import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { SefMagacinaDTO } from "../dto";
import { Magacin } from "../entity/Magacin";
import { SefMagacina } from "../entity/SefMagacina";


export async function izmeniSefaMagacina(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body as Partial<SefMagacinaDTO>;

    const sefMagacina = await getRepository(SefMagacina).findOne(id);
    if (!sefMagacina) {
        res.sendStatus(404);
        return;
    }
    const magacinID = sefMagacina.magacin.sifraMagacina;
    await getManager().transaction(async manager => {
        const sef = await manager.save(SefMagacina, {
            imeSM: data.imeSM,
            sifraSM: id,
            prezimeSM: data.prezimeSM,


        }) as SefMagacina;
        if (data.magacin) {
            const updateResult = await manager.update(Magacin, data.magacin, {
                sefMagacina: {
                    sifraSM: id
                }
            });


        } else {
            if(magacinID)
            await manager.update(Magacin, magacinID,{
                sefMagacina:undefined
            })
        }


    })

    res.sendStatus(204);
}