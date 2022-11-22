import React from 'react'

const ActionMenu = (props) => {

    const [user] = props

    return (
        <>
            <CommandMenu user={user}/>
            <CombatMenu user={user}/>
        </>
    )
}

export default ActionMenu