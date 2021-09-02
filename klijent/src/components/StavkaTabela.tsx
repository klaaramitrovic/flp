

import React from 'react'
import { Table } from 'semantic-ui-react'
import { StavkaLagerListe } from '../tipovi'

interface Props {
    stavke: StavkaLagerListe[]
    active?: StavkaLagerListe,
    onRowClick?: (stavka: StavkaLagerListe) => void,
    selectable?: boolean
}

export default function StavkaTabela(props: Props) {
    return (
        <Table selectable={props.selectable}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Rb</Table.HeaderCell>
                    <Table.HeaderCell>Proizvod</Table.HeaderCell>
                    <Table.HeaderCell>Stanje na zalihama</Table.HeaderCell>
                    <Table.HeaderCell>Iznos stavke</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.stavke.map(element => {

                        return (
                            <Table.Row key={element.sifraSLL} active={props.selectable && element === props.active} onClick={() => {
                                if (props.onRowClick)
                                    props.onRowClick(element);
                            }} >
                                <Table.Cell>{element.sifraSLL}</Table.Cell>
                                <Table.Cell>{element.proizvod.nazivPR}</Table.Cell>
                                <Table.Cell>{element.stanjeSLL}</Table.Cell>
                                <Table.Cell>{element.iznosSLL}</Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}
