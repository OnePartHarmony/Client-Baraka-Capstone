import React, {useEffect, useState} from 'react'
import CommandMenu from './CommandMenu'
import CombatMenu from './CombatMenu'

const ActionMenu = (props) => {

    const {user, playerState, setPlayerState, clickedTerritory, setClickedTerritory, advancingTerritory, setAdvancingTerritory, setTerritoriesWithConfirmedCommands} = props
    const [command, setCommand] = useState(null)

    //when advance is chosen as the commmand, the advancing territory needs to be seen as the 'to' territory is chosen
    useEffect(() => {
        if (command === 'advance'){
            setAdvancingTerritory(clickedTerritory)            
        }
    }, [command])

    useEffect(() => {
        if (advancingTerritory === clickedTerritory){
            setClickedTerritory(null)
        }
    }, [advancingTerritory])

    return (
        <div className='gameRight'>
            {playerState === 'wait' &&
                <p>Waiting for other players...</p>
            }
            {playerState === 'selectTerritory' &&
                <p>Choose a territory.</p>
            }
            {playerState === 'selectCommand' &&
                <CommandMenu
                    user={user}
                    playerState={playerState}
                    setPlayerState={setPlayerState}
                    clickedTerritory={clickedTerritory}
                    setClickedTerritory={setClickedTerritory}
                    advancingTerritory={advancingTerritory}
                    setAdvancingTerritory={setAdvancingTerritory}
                    setTerritoriesWithConfirmedCommands={setTerritoriesWithConfirmedCommands}
                />
            }
            {playerState === 'combat' &&
                <CombatMenu user={user}/>
            }
            
        </div>
    )
}

export default ActionMenu