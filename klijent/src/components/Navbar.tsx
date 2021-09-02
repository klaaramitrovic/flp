

import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default function Navbar() {
    return (
        <Menu borderless fluid >
            <Menu.Item header  >FLP</Menu.Item>
            <Menu.Item as={Link} to='/' >Početna strana</Menu.Item>
            <Menu.Item as={Link} to='/sefmagacina'>Šef magacina</Menu.Item>
            <Menu.Item as={Link} to='/lagerlista' >Lager lista</Menu.Item>
        </Menu>
    )
}
