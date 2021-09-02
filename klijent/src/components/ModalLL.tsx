

import React, { useEffect, useState } from 'react';
import { Button, Form, Grid, Header, Modal, Radio } from 'semantic-ui-react';
import { Centrala, LagerLista, Proizvod, SefMagacina, StavkaLagerListe } from '../tipovi';
import { onRowClick, setFormState } from '../util';
import StavkaTabela from './StavkaTabela';
interface Props {
    lagerLista?: LagerLista,
    visible: boolean,
    onClose: () => void,
    proizvodi: Proizvod[],
    centrale: Centrala[],
    sefovi: SefMagacina[],
    stavke: StavkaLagerListe[],
    onDodajStavku: (stavka: StavkaLagerListe) => void,
    onIzmeniStavku: (stavka: StavkaLagerListe, selStavka?: StavkaLagerListe) => void,
    onObrisiStavku: (stavka?: StavkaLagerListe) => void,
    onSubmit: (lagerLista: any) => Promise<void>
}
export default function ModalLL(props: Props) {

    const [selCentrala, setSelCentrala] = useState<Centrala | undefined>(undefined);
    const [selSef, setSelSef] = useState<SefMagacina | undefined>(undefined)
    const [selProizvod, setSelProizvod] = useState<Proizvod | undefined>(undefined)
    const [datum, setDatum] = useState('');

    const [naziv, setNaziv] = useState('');
    const [selStavka, setSelStavka] = useState<StavkaLagerListe | undefined>(undefined)
    const [stanje, setStanje] = useState<'izmenjena' | 'potpisana'>('izmenjena')

    const kolicina = selProizvod?.stanja.reduce((prev, curr) => {
        return prev + curr.kolicina;
    }, 0) || '';

    const iznos = (kolicina === '' || !selProizvod) ? '' : kolicina * selProizvod.cenaPR



    useEffect(() => {
        setSelProizvod(selStavka?.proizvod);
    }, [selStavka])

    useEffect(() => {
        setSelCentrala(props.lagerLista?.centrala);
        setSelProizvod(undefined);
        setSelStavka(undefined);
        setSelSef(props.lagerLista?.sefMagacina);
        setDatum(props.lagerLista?.datumSlanja.substring(0,10) || '');
        setNaziv(props.lagerLista?.nazivLL || '')
    }, [props.lagerLista])

    return (
        <Modal open={props.visible} onClose={props.onClose}>
            <Modal.Header>{props.lagerLista ? 'Izmeni' : 'Kreiraj'} lager listu</Modal.Header>
            <Modal.Content>
                <Form >
                    <Grid columns='16' centered>
                        <Grid.Row>
                            <Grid.Column width='10'>
                                <Form.Input disabled label='Sifra lager liste' value={props.lagerLista?.sifraLL || ''} />
                                <Form.Dropdown selection label='Centrala' value={selCentrala?.sifraCentrale} options={props.centrale.map(element => {
                                    return {
                                        value: element.sifraCentrale,
                                        key: element.sifraCentrale,
                                        text: element.nazivCentrale,
                                        onClick: () => { setSelCentrala(element) }
                                    }
                                })} />
                                <Form.Dropdown selection label='Sef magacina' value={selSef?.sifraSM} options={props.sefovi.map(element => {
                                    return {
                                        value: element.sifraSM,
                                        key: element.sifraSM,
                                        text: element.imeSM + ' ' + element.prezimeSM,
                                        onClick: () => { setSelSef(element) }
                                    }
                                })} />


                            </Grid.Column>
                            <Grid.Column width='6'>
                                <Form.Input label='Naziv lager liste' value={naziv} onChange={setFormState(setNaziv)} />
                                <Form.Input label='Datum lager liste' type='date' value={datum} onChange={setFormState(setDatum)} />
                                {
                                    props.lagerLista ? (
                                        <>

                                            <Form.Field>
                                                <Radio
                                                    onChange={() => { setStanje('izmenjena') }}
                                                    label='Izmenjena'
                                                    name='grupa'
                                                    checked={stanje == 'izmenjena'}

                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio
                                                    onChange={() => { setStanje('potpisana') }}
                                                    label='Potpisana'
                                                    name='grupa'
                                                    checked={stanje == 'potpisana'}

                                                />
                                            </Form.Field>
                                        </>
                                    ) : (
                                        <Form.Field>
                                            <Radio
                                                label='Kreirana'
                                                disabled
                                                checked

                                            />
                                        </Form.Field>
                                    )
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>


                </Form>
                <Header>
                    Forma stavka
                </Header>
                <Form onSubmit={(e) => {
                    e.preventDefault();

                    if (selStavka) {
                        props.onIzmeniStavku({
                            proizvod: selProizvod!,
                            obrisana: false,
                            stanjeSLL: Number(kolicina),
                            iznosSLL: Number(iznos),

                        }, selStavka)
                    } else {
                        props.onDodajStavku({
                            proizvod: selProizvod!,
                            obrisana: false,
                            stanjeSLL: Number(kolicina),
                            iznosSLL: Number(iznos),

                        })
                    }
                    setSelStavka(undefined);
                }}>
                    <Form.Dropdown selection label='Proizvod' value={selProizvod?.sifraPR} options={props.proizvodi.filter(element => {
                        return selStavka?.proizvod.sifraPR === element.sifraPR || props.stavke.find(stavka => (!stavka.obrisana && stavka.proizvod.sifraPR === element.sifraPR)) === undefined
                    }).map(element => {
                        return {
                            key: element.sifraPR,
                            value: element.sifraPR,
                            text: element.nazivPR,
                            onClick: () => { setSelProizvod(element) }
                        }
                    })} />
                    <Form.Input disabled label='Kolicina' value={kolicina} />
                    <Form.Input disabled label='Iznos' value={iznos} />
                    <Form.Button fluid>Sacuvaj stavku</Form.Button>

                </Form>
                {
                    selStavka && (
                        <Form.Button fluid negative onClick={() => {
                            props.onObrisiStavku(selStavka);
                            setSelStavka(undefined);
                        }}>Obrisi stavku</Form.Button>
                    )
                }
                <StavkaTabela selectable active={selStavka} onRowClick={onRowClick(setSelStavka)} stavke={props.stavke.filter(element => !element.obrisana)} />
            </Modal.Content>
            <Modal.Actions>
                <Button primary onClick={() => {
                    props.onSubmit({
                        nazivLL: naziv,
                        centrala: selCentrala?.sifraCentrale,
                        datumSlanja: datum,
                        stanje,
                        sefMagacina: selSef?.sifraSM,
                        stavke: props.stavke.map(element => {
                            return {
                                proizvodId: element.proizvod.sifraPR,
                                sifraStavka: element.sifraSLL,
                                obrisana: element.obrisana
                            }
                        })
                    })
                }}>Sacuvaj lager listu</Button>
                <Button negative onClick={() => {
                    props.onClose();
                }}>Odustani</Button>
            </Modal.Actions>
        </Modal>
    )
}
