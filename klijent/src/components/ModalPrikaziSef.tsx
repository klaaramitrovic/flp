

import React from 'react'
import { Form, Modal } from 'semantic-ui-react'
import { SefMagacina } from '../tipovi'
interface Props {
    sefMagacina?: SefMagacina,
    visible: boolean,
    onClose: () => void
}
export default function ModalPrikaziSef(props: Props) {
    return (
        <Modal onClose={props.onClose} open={props.visible} closeIcon>
            <Modal.Header>Pregled Sefa magacina</Modal.Header>
            <Modal.Content >
                <Form size='big' >
                    <Form.Input readOnly value={props.sefMagacina?.sifraSM} label='Sifra sefa magacina' />
                    <Form.Input readOnly value={props.sefMagacina?.imeSM} label='Ime sefa magacina' />
                    <Form.Input readOnly value={props.sefMagacina?.prezimeSM} label='Prezime sefa magacina' />
                    <Form.Input readOnly value={props.sefMagacina?.magacin?.naziv} label='Magacin' />
                </Form>
            </Modal.Content>
        </Modal>
    )
}
