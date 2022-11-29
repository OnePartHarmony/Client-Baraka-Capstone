import React from 'react'
// import CommandMenu from './CommandMenu'
import CombatMenu from './CombatMenu'

const ActionMenu = (props) => {

    const {user} = props

    return (
        <div className='gameRight'>
            {/* <CommandMenu user={user}/>*/}
            <CombatMenu user={user}/>
        </div>
    )
}

export default ActionMenu