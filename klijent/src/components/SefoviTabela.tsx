import React from 'react'
import { Table } from 'semantic-ui-react'
import { SefMagacina } from '../tipovi'


interface Props {
    sefovi: SefMagacina[],
    active?: SefMagacina,
    onRowClick: (sef: SefMagacina) => void
}

export default function SefoviTabela(props: Props) {
    return (
        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Sifra</Table.HeaderCell>
                    <Table.HeaderCell>Ime</Table.HeaderCell>
                    <Table.HeaderCell>Prezime</Table.HeaderCell>
                    <Table.HeaderCell>Magacin</Table.HeaderCell>
                </Table.Row>

            </Table.Header>
            <Table.Body>
                {
                    props.sefovi.map(element => {
                        return (
                            <Table.Row onClick={() => {
                                props.onRowClick(element);
                            }} active={element === props.active} key={element.sifraSM}>
                                <Table.Cell>{element.sifraSM}</Table.Cell>
                                <Table.Cell>{element.imeSM}</Table.Cell>
                                <Table.Cell>{element.prezimeSM}</Table.Cell>
                                <Table.Cell>{element.magacin?.naziv || 'Nije šef'}</Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}
