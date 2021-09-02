import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Grid, Input } from 'semantic-ui-react'
import LagerListaTabela from '../components/LagerListaTabela';
import ModalLL from '../components/ModalLL';
import ModalPrikaziLL from '../components/ModalPrikaziLL';
import { vratiListu } from '../service/vratiListu';
import { Centrala, LagerLista, Proizvod, SefMagacina, StavkaLagerListe } from '../tipovi';
import { onRowClick, setFormState } from '../util'

interface Props {
    lagerListe: LagerLista[],
    proizvodi: Proizvod[],
    centrale: Centrala[],
    obrisiLagerListu: (id?: number) => Promise<void>,
    sefoviMagacina: SefMagacina[],
    kreirajLL: (data: any) => Promise<void>,
    izmeniLL: (data: any, id?: number) => Promise<void>
}

export default function LagerListaPage(props: Props) {
    const [search, setSearch] = useState('');
    const [kreiranaCheck, setKreiranaCheck] = useState(false);
    const [izmenjenaCheck, setIzmenjenaCheck] = useState(false);
    const [potpisanaCheck, setPotpisanaCheck] = useState(false);
    const [selLagerLista, setSelLagerLista] = useState<LagerLista | undefined>(undefined)
    const [stavke, setStavke] = useState<StavkaLagerListe[]>([])
    const [visiblePrikazi, setVisiblePrikazi] = useState(false);
    const [visibleKreiraj, setVisibleKreiraj] = useState(false);
    const [visibleIzmeni, setVisibleIzmeni] = useState(false)
    const onCloseKreiraj = () => { setVisibleKreiraj(false) }
    const onClosePrikazi = () => { setVisiblePrikazi(false) };
    const onCloseIzmeni = () => { setVisibleIzmeni(false) };

    const filtriraneLL = props.lagerListe.filter(element => {
        return ((kreiranaCheck === izmenjenaCheck && kreiranaCheck === potpisanaCheck) || (element.stanje === 'izmenjena' && izmenjenaCheck) || (element.stanje === 'kreirana' && kreiranaCheck) || (element.stanje === 'potpisana' && potpisanaCheck)) && ((element.sifraLL + '').includes(search) || element.nazivLL.includes(search) || (element.sefMagacina.imeSM + '' + element.sefMagacina.prezimeSM).includes(search))
    })
    useEffect(() => {
        if (!selLagerLista) {
            setVisibleIzmeni(false);
            setVisibleKreiraj(false);

        }
    }, [selLagerLista])
    const dodajStavku = (stavka: StavkaLagerListe) => {
        setStavke(prev => {
            return [...prev, stavka];
        })
    }
    const izmeniStavku = (novaStavka: StavkaLagerListe, selStavka?: StavkaLagerListe) => {
        setStavke(prev => {
            return prev.map(element => {
                if (element === selStavka) {
                    return novaStavka;
                }
                return element;
            })
        })
    }
    const obrisiStavku = (selStavka?: StavkaLagerListe) => {
        setStavke(prev => {
            if (!selStavka?.sifraSLL) {
                return prev.filter(element => element !== selStavka);
            }
            return prev.map(element => {
                if (element === selStavka) {
                    return { ...element, obrisana: true }
                }
                return element;
            })
        })
    }
    useEffect(() => {
        if (!selLagerLista) {
            setStavke([]);
            return;
        }
        vratiListu<StavkaLagerListe[]>(`/lagerlista/${selLagerLista.sifraLL}/stavke`).then(stavke => {
            setStavke(stavke);
        })
    }, [selLagerLista])


    return (
        <Grid centered columns='16' padded>
            <ModalLL onSubmit={async (data) => {
                props.kreirajLL(data).then(() => {

                    setVisibleKreiraj(false);
                })
            }} onDodajStavku={dodajStavku} onIzmeniStavku={izmeniStavku} onObrisiStavku={obrisiStavku} visible={visibleKreiraj} onClose={onCloseKreiraj} centrale={props.centrale} sefovi={props.sefoviMagacina} proizvodi={props.proizvodi} stavke={stavke} />
            <ModalLL onSubmit={async (data) => {
                await props.izmeniLL(data, selLagerLista?.sifraLL)
                setSelLagerLista(undefined);
            }} onDodajStavku={dodajStavku} onIzmeniStavku={izmeniStavku} onObrisiStavku={obrisiStavku} lagerLista={selLagerLista} visible={visibleIzmeni} onClose={onCloseIzmeni} centrale={props.centrale} sefovi={props.sefoviMagacina} proizvodi={props.proizvodi} stavke={stavke} />
            <ModalPrikaziLL stavke={stavke} proizvodi={props.proizvodi} visible={visiblePrikazi} onClose={onClosePrikazi} lagerLista={selLagerLista} />
            <Grid.Row >
                <Grid.Column width='8'>
                    <Input icon='search' label='Kriterijum pretrage' value={search} onChange={setFormState(setSearch)} fluid />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width='2'>
                    <Checkbox checked={kreiranaCheck} onChange={(e, data) => {
                        setKreiranaCheck(data.checked || false);
                    }} label='Kreirana' />
                </Grid.Column>
                <Grid.Column width='2'>
                    <Checkbox checked={izmenjenaCheck} onChange={(e, data) => {
                        setIzmenjenaCheck(data.checked || false);
                    }} label='Izmenjena' />
                </Grid.Column>
                <Grid.Column width='2'>
                    <Checkbox checked={potpisanaCheck} onChange={(e, data) => {
                        setPotpisanaCheck(data.checked || false);
                    }} label='Potpisana' />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width='9'>
                    <LagerListaTabela active={selLagerLista} onRowClick={onRowClick(setSelLagerLista)} lagerListe={filtriraneLL} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row >
                <Grid.Column width='2'>
                    <Button disabled ={selLagerLista != undefined}fluid primary onClick={() => {
                        setVisibleKreiraj(true);
                    }} >Kreiraj</Button>
                </Grid.Column>
                <Grid.Column width='2'>
                    <Button disabled={selLagerLista === undefined} fluid color='vk' onClick={() => {
                        setVisiblePrikazi(true);
                    }} >Prikazi</Button>
                </Grid.Column>
                <Grid.Column width='2'>
                    <Button onClick={() => {
                        setVisibleIzmeni(true);
                    }} disabled={selLagerLista === undefined || selLagerLista.stanje === 'potpisana'} fluid color='green' >Izmeni</Button>
                </Grid.Column>
                <Grid.Column width='2'>
                    <Button onClick={() => {
                        props.obrisiLagerListu(selLagerLista?.sifraLL).then(() => {
                            setSelLagerLista(undefined);
                        })

                    }} disabled={selLagerLista === undefined || selLagerLista.stanje === 'potpisana'} fluid negative >Obrisi</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
