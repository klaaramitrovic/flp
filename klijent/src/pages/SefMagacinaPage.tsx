

import React, { useEffect, useState } from 'react'
import { Button, Grid, Input } from 'semantic-ui-react'
import SefoviTabela from '../components/SefoviTabela'
import { Magacin, SefMagacina } from '../tipovi'
import ModalPrikaziSef from '../components/ModalPrikaziSef'
import { onRowClick, setFormState } from '../util'
import ModalSef from '../components/ModalSef'
interface Props {
    sefovi: SefMagacina[],
    magacini: Magacin[],
    kreirajSefa: (sef: Partial<SefMagacina>) => void,
    izmeniSefa: (id: number, sef: Partial<SefMagacina>) => void
    obrisiSefa: (id: number) => void
}

export default function SefMagacinaPage(props: Props) {


    const [selectedSef, setSelectedSef] = useState<SefMagacina | undefined>(undefined);
    const [visibleModalPrikazi, setVisibleModalPrikazi] = useState(false);
    const [visibleModalIzmeni, setVisibleModalIzmeni] = useState(false);
    const [visibleModalKreiraj, setVisibleModalKreiraj] = useState(false)
    const onCloseModalPrikazi = () => {
        setVisibleModalPrikazi(false);
    }
    const onCloseModalKreiraj = () => {
        setVisibleModalKreiraj(false);
    }
    const onCloseModalIzmeni = () => {
        setVisibleModalIzmeni(false);
    }
    const onSubmit = (sef: Partial<SefMagacina>) => {

    }
    const [search, setSearch] = useState('');

    const filtriraniSefovi = props.sefovi.filter(element => {
        return search === '' || element.imeSM.includes(search) || element.prezimeSM.includes(search) || element.magacin?.naziv.includes(search)
    })
    useEffect(() => {
        if (selectedSef === undefined) {
            return;
        }
        if (!filtriraniSefovi.includes(selectedSef)) {
            setSelectedSef(undefined);
        }

    }, [filtriraniSefovi, selectedSef])
    return (
        <Grid centered padded columns='16'>
            <ModalPrikaziSef onClose={onCloseModalPrikazi} visible={visibleModalPrikazi} sefMagacina={selectedSef} />
            <ModalSef visible={visibleModalIzmeni} onClose={onCloseModalIzmeni} magacini={props.magacini} onSubmit={(sef) => {
                props.izmeniSefa(selectedSef?.sifraSM || 0, sef);
            }} sefMagacina={selectedSef} />
            <ModalSef visible={visibleModalKreiraj} onClose={onCloseModalKreiraj} magacini={props.magacini} onSubmit={props.kreirajSefa} />

            <Grid.Row >
                <Grid.Column width='8'>
                    <Input icon='search' label='Kriterijum pretrage' value={search} onChange={setFormState(setSearch)} fluid />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width='9'>
                    <SefoviTabela onRowClick={onRowClick(setSelectedSef)} active={selectedSef} sefovi={filtriraniSefovi} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row >
                <Grid.Column width='2'>
                    <Button disabled = {selectedSef != undefined} fluid primary onClick={() => {
                        setVisibleModalKreiraj(true);
                    }}>Kreiraj</Button>
                </Grid.Column>
                <Grid.Column width='2'>
                    <Button disabled={selectedSef === undefined} fluid color='vk' onClick={() => {
                        setVisibleModalPrikazi(true);
                    }} >Prikazi</Button>
                </Grid.Column>
                <Grid.Column width='2'>
                    <Button disabled={selectedSef === undefined} fluid color='green' onClick={() => {
                        setVisibleModalIzmeni(true);
                    }}>Izmeni</Button>
                </Grid.Column>
                <Grid.Column width='2'>
                    <Button disabled={selectedSef === undefined || selectedSef.magacin !== null} fluid negative onClick={() => {
                        if (!selectedSef) {
                            return;
                        }
                        props.obrisiSefa(selectedSef.sifraSM);
                    }}>Obrisi</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
