export interface SefMagacinaDTO {
    imeSM: string,
    prezimeSM: string,
    magacin?: number
}
export interface LagerListaDTO {
    nazivLL: string,
    datumSlanja: string,
    centrala: number,
    stanje: 'izmenjena' | 'potpisana',
    sefMagacina: number,
    stavke: StavkaDTO[]
}

export interface StavkaDTO {


    proizvodId: number,

    sifraStavka?: number,
    obrisana?: boolean

}