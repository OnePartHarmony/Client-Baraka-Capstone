import React, { useEffect, useState } from 'react'
import CommandMenu from './CommandMenu'
import CombatMenu from './CombatMenu'
import { Button } from 'react-bootstrap'
import { socket } from '../../apiConfig'

const ActionMenu = (props) => {

    const { user, gameObject, userPlayerObject, playerState, setPlayerState, clickedTerritory, setClickedTerritory, advancingTerritory, setAdvancingTerritory, setTerritoriesWithConfirmedCommands } = props
    const [command, setCommand] = useState(null)
    const [commandList, setCommandList] = useState([])
    const [soldiersMarching, setSoldiersMarching] = useState(0)
    const [priestsMarching, setPriestsMarching] = useState(0)
    const [musteredUnit, setMusteredUnit] = useState(null)
    const [formation, setFormation] = useState('Hedgehog')
    const [confirmedFormation, setConfirmedFormation] = useState(null)

    useEffect(() => {
        return () => {
            setSoldiersMarching(0)
            setPriestsMarching(0)
            setMusteredUnit(null)
            setAdvancingTerritory(null)
            setClickedTerritory(null)
            setPlayerState('wait')
            setCommand(null)
            setCommandList([])
        }
    }, [])

    //when advance is chosen as the commmand, the advancing territory needs to be seen as the 'to' territory is chosen
    useEffect(() => {
        if (command === 'advance') {
            setAdvancingTerritory(clickedTerritory)
        }
    }, [command])

    useEffect(() => {
        if (advancingTerritory === clickedTerritory) {
            setClickedTerritory(null)
        }
    }, [advancingTerritory])

    const handleIssueCommands = () => {
        let sentFormation = formation
        if (confirmedFormation) {sentFormation = confirmedFormation}

        let commandObject = {
            commandList: commandList,
            formation: sentFormation
        }
        socket.emit('issueCommands', commandObject, userPlayerObject._id, gameObject._id)

        setSoldiersMarching(0)
        setPriestsMarching(0)
        setMusteredUnit(null)
        setAdvancingTerritory(null)
        setClickedTerritory(null)
        setPlayerState('wait')
        setCommand(null)
        setFormation(null)
        setConfirmedFormation(null)
    }

    return (
        <div className='gameRight'>
            {/* {playerState === 'wait' &&
                <p>Waiting for other players...</p>
            } */}
            {/* {playerState === 'selectTerritory' &&
                <p>Choose a territory.</p>
            } */}
            {playerState === 'selectCommand' &&
                <CommandMenu
                    user={user}
                    gameObject={gameObject}
                    playerState={playerState}
                    setPlayerState={setPlayerState}
                    clickedTerritory={clickedTerritory}
                    setClickedTerritory={setClickedTerritory}
                    advancingTerritory={advancingTerritory}
                    setAdvancingTerritory={setAdvancingTerritory}
                    setTerritoriesWithConfirmedCommands={setTerritoriesWithConfirmedCommands}
                    userPlayerObject={userPlayerObject}
                    command={command}
                    setCommand={setCommand}
                    commandList={commandList}
                    setCommandList={setCommandList}
                    soldiersMarching={soldiersMarching}
                    setSoldiersMarching={setSoldiersMarching}
                    priestsMarching={priestsMarching}
                    setPriestsMarching={setPriestsMarching}
                    musteredUnit={musteredUnit}
                    setMusteredUnit={setMusteredUnit}
                    formation={formation}
                    setFormation={setFormation}
                />
            }
            {/* {playerState === 'combat' &&
                <CombatMenu user={user}/>
            } */}

                {(playerState === 'selectTerritory' && (!confirmedFormation) ) &&
                    <CombatMenu formation={formation} setFormation={setFormation} setConfirmedFormation={setConfirmedFormation} />
                }
            <div>                
                <Button onClick={handleIssueCommands} variant='warning'>ISSUE ALL CONFIRMED COMMANDS</Button>
            </div>
        </div>
    )
}

export default ActionMenu