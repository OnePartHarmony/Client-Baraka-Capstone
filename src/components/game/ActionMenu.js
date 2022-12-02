import React, { useEffect, useState } from 'react'
import CommandMenu from './CommandMenu'
import CombatMenu from './CombatMenu'
import { socket } from '../../apiConfig'
import { Button } from 'react-bootstrap'

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
        <>
            {(playerState === 'selectCommand' || playerState === 'selectTerritory' || playerState === 'combat') &&
                <div className='gameRight'>
                    {/* {playerState === 'wait' &&
                        <p>Waiting for other players...</p>
                    } */}
                    {playerState === 'selectTerritory' &&
                        <h4>Choose a Territory to Command or</h4>
                    }
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
                            <CombatMenu
                                formation={formation}
                                setFormation={setFormation}
                                setConfirmedFormation={setConfirmedFormation}
                                currentSeason={gameObject.currentSeason}
                            />
                        }
                    <div>
                        {playerState === 'selectTerritory' &&
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button className='issueCommands' variant='warning' onClick={handleIssueCommands}>ISSUE ALL CONFIRMED COMMANDS</Button>
                            </div>
                        }
                    </div>
                </div>
            }
        </>

    )
}

export default ActionMenu