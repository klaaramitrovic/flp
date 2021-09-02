import { Request, Response } from "express";
import { Centrala } from "./entity/Centrala";
import { LagerLista } from "./entity/LagerLista";
import { Magacin } from "./entity/Magacin";
import { Proizvod } from "./entity/Proizvod";
import { SefMagacina } from "./entity/SefMagacina";
import { izmeniSefaMagacina } from "./handlers/izmeniSefaMagacina";
import { kreirajSefaMagacina } from "./handlers/kreirajSefaMagacina";
import { izmeniLL } from "./handlers/lagerLista/izmeniLL";
import { kreirajLL } from "./handlers/lagerLista/kreirajLL";
import { vratiStavke } from "./handlers/lagerLista/vratiStavke";
import { obrisiGeneral } from "./handlers/obrisiGeneral";
import { vratiGeneral } from "./handlers/vratiGeneral";

interface Route {
    path: string,
    method: 'get' | 'post' | 'patch' | 'delete',
    handler?: (req: Request, res: Response) => void
}

export const Routes: Route[] = [{
    method: 'get',
    path: '/centrala',
    handler: vratiGeneral(Centrala)
}, {
    method: 'get',
    path: '/proizvod',
    handler: vratiGeneral(Proizvod)
}, {
    method: 'get',
    path: '/lagerlista',
    handler: vratiGeneral(LagerLista)
}, {
    method: 'get',
    path: '/magacin',
    handler: vratiGeneral(Magacin)
}, {
    method: 'get',
    path: '/sefmagacina',
    handler: vratiGeneral(SefMagacina)
}, {
    method: 'post',
    path: '/sefmagacina',
    handler: kreirajSefaMagacina

}, {
    method: 'patch',
    path: '/sefmagacina/:id',
    handler: izmeniSefaMagacina,

}, {
    method: 'delete',
    path: '/sefmagacina/:id',
    handler: obrisiGeneral(SefMagacina)
}, {
    method: 'post',
    path: '/lagerlista',
    handler: kreirajLL

}, {
    method: 'patch',
    path: '/lagerlista/:id',
    handler: izmeniLL,

}, {
    method: 'delete',
    path: '/lagerlista/:id',
    handler: obrisiGeneral(LagerLista, (val: LagerLista) => val.stanje !== 'potpisana')
}, {
    method: 'get',
    path: '/lagerlista/:id/stavke',
    handler: vratiStavke
}];