

export interface Magacin {
    sifraMagacina: number,
    naziv: string
}

export interface SefMagacina {
    sifraSM: number,
    imeSM: string,
    prezimeSM: string,
    magacin?: Magacin
}

export interface Centrala {
    sifraCentrale: number,
    nazivCentrale: string
}
export interface LagerLista {
    sifraLL: number,
    nazivLL: string,
    datumSlanja: string,
    centrala: Centrala,
    sefMagacina: SefMagacina,
    stanje: 'kreirana' | 'izmenjena' | 'potpisana',
    stavke: StavkaLagerListe[]
}

export interface Proizvod {
    sifraPR: number,
    nazivPR: string,
    cenaPR: number,
    stanja: StanjeProizvoda[]
}

export interface StanjeProizvoda {
    redniBrojSP: number,
    kolicina: number,
    proizvodId: number,

}
export interface StavkaLagerListe {
    sifraSLL?: number,
    iznosSLL: number,
    stanjeSLL: number,

    proizvod: Proizvod,
    obrisana?: boolean

}