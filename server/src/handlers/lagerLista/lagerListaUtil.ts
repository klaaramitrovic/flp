import { LagerListaDTO, StavkaDTO } from "../../dto";
import { LagerLista } from "../../entity/LagerLista";




export function pripremiZaSave(data: LagerListaDTO) {
    return {
        nazivLL: data.nazivLL,
        centrala: {
            sifraCentrale: data.centrala
        },
        datumSlanja: data.datumSlanja,
        sefMagacina: {
            sifraSM: data.sefMagacina
        },

    }
}
export function pripremiStavkuZaSave(stavkaDTO: StavkaDTO, lagerLista: LagerLista) {
    return {
        proizvod: {
            sifraPR: stavkaDTO.proizvodId
        },
        lagerLista: lagerLista
    }
}