

import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { LagerLista, Proizvod, StavkaLagerListe } from '../tipovi'
import StavkaTabela from './StavkaTabela'
interface Props {
    lagerLista?: LagerLista,
    visible: boolean,
    onClose: () => void,
    proizvodi: Proizvod[],
    stavke: StavkaLagerListe[]
}
export default function ModalPrikaziLL(props: Props) {
    return (
        <Modal open={props.visible} onClose={props.onClose} >
            <Modal.Header>Prikaz lager Liste</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Input label='Sifra lager liste' value={props.lagerLista?.sifraLL} readOnly />
                    <Form.Input label='Naziv lager liste' value={props.lagerLista?.nazivLL} readOnly />
                    <Form.Input label='Datun lager liste' value={props.lagerLista?.datumSlanja.substring(0, 10)} type='date' readOnly />
                    <Form.Input label='Centrala' value={props.lagerLista?.centrala.nazivCentrale} readOnly />
                    <Form.Input label='Sef magacina' value={props.lagerLista?.sefMagacina.imeSM + ' ' + props.lagerLista?.sefMagacina.prezimeSM} readOnly />
                    <Form.Input label='Stanje' value={props.lagerLista?.stanje} readOnly />
                </Form>
                <StavkaTabela stavke={props.stavke} />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={props.onClose}>Zatvori</Button>
            </Modal.Actions>
        </Modal>
    )
}
