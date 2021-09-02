
import React from 'react'
import { Table } from 'semantic-ui-react'
import { LagerLista } from '../tipovi'

interface Props {
    lagerListe: LagerLista[],
    active?: LagerLista,
    onRowClick: (lagerLista: LagerLista) => void
}

export default function LagerListaTabela(props: Props) {
    return (
        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Sifra</Table.HeaderCell>
                    <Table.HeaderCell>Naziv</Table.HeaderCell>
                    <Table.HeaderCell>Datum slanja</Table.HeaderCell>
                    <Table.HeaderCell>Sef magacina</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.lagerListe.map(element => {
                        return (
                            <Table.Row active={element === props.active} onClick={() => {
                                props.onRowClick(element);
                            }} key={element.sifraLL}>
                                <Table.Cell>{element.sifraLL}</Table.Cell>
                                <Table.Cell>{element.nazivLL}</Table.Cell>
                                <Table.Cell>{element.datumSlanja.substring(0, 10)}</Table.Cell>
                                <Table.Cell>{element.sefMagacina.imeSM + ' ' + element.sefMagacina.prezimeSM}</Table.Cell>
                            </Table.Row>

                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}
