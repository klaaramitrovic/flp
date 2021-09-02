

import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'semantic-ui-react'
import { Magacin, SefMagacina } from '../tipovi'
import { setFormState } from '../util';
interface Props {
    sefMagacina?: SefMagacina,
    visible: boolean,
    onClose: () => void,
    magacini: Magacin[],
    onSubmit: (sef: Partial<SefMagacina>) => void
}
export default function ModalSef(props: Props) {

    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [selMagacin, setSelMagacin] = useState<Magacin | undefined>(undefined);

    useEffect(() => {
        setIme(props.sefMagacina?.imeSM || '');
        setPrezime(props.sefMagacina?.prezimeSM || '');

        setSelMagacin(props.sefMagacina?.magacin);
    }, [props.sefMagacina])


    return (
        <Modal onClose={props.onClose} open={props.visible} closeIcon>
            <Modal.Header>{props.sefMagacina ? 'Izmeni' : 'Kreiraj'} sefa magacina</Modal.Header>
            <Modal.Content >
                <Form size='big' onSubmit={() => {
                    props.onSubmit({
                        imeSM: ime,
                        prezimeSM: prezime,
                        magacin: selMagacin
                    })
                }} >
                    {
                        props.sefMagacina && (
                            <Form.Input readOnly value={props.sefMagacina.sifraSM} label='Sifra sefa magacina' />
                        )
                    }
                    <Form.Input required value={ime} onChange={setFormState(setIme)} label='Ime sefa magacina' />
                    <Form.Input required value={prezime} onChange={setFormState(setPrezime)} label='Prezime sefa magacina' />
                    <Form.Dropdown clearable onChange={(e, data) => {
                        setSelMagacin(props.magacini.find(element => element.sifraMagacina === data.value));
                    }} label='Magacin' value={selMagacin?.sifraMagacina} selection required fluid options={props.magacini.map(element => {
                        return {
                            value: element.sifraMagacina,
                            key: element.sifraMagacina,
                            text: element.naziv,

                        }
                    })} />
                    <Form.Button primary>Sacuvaj</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}
