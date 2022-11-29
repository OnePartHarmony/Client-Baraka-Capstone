import React from 'react'
import CommandMenu from './CommandMenu'
import CombatMenu from './CombatMenu'

const ActionMenu = (props) => {

    const {user, playerState} = props

    return (
        <div className='gameRight'>
            {playerState === 'wait' &&
                <p>Waiting for other players...</p>
            }
            {playerState === 'selectTerritory' &&
                <p>Choose a territory to command.</p>
            }
            {playerState === 'selectCommand' &&
                <CommandMenu user={user}/>
            }
            {playerState === 'combat' &&
                <CombatMenu user={user}/>
            }
            
        </div>
    )
}

export default ActionMenu