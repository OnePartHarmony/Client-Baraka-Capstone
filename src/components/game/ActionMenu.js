import React from 'react'
import CommandMenu from './CommandMenu'
import CombatMenu from './CombatMenu'

const ActionMenu = (props) => {

    const {user} = props

    return (
        <>
            <CommandMenu user={user}/>
            <CombatMenu user={user}/>
        </>
    )
}

export default ActionMenu