import React, { useEffect, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { socket } from '../../apiConfig'
import CombatMenu from './CombatMenu'
import { setSoldier, setPriest } from './game-board/setTerritoryImages'


const CommandMenu = (props) => {

    const { user, soldiersMarching, setSoldiersMarching, commandList, setCommandList, gameObject, userPlayerObject, playerState, setPlayerState, clickedTerritory, setClickedTerritory, command, setCommand, setTerritoriesWithConfirmedCommands, advancingTerritory, setAdvancingTerritory, musteredUnit, setMusteredUnit, priestsMarching, setPriestsMarching } = props

    const [confirmIsNOTClickable, setConfirmIsNOTClickable] = useState(true)

    let priestButtonColor = 'secondary'
    let soldierButtonColor = 'secondary'

    // for highlighting muster selection
    useEffect(() => {
        if (musteredUnit === 'priest') {
            priestButtonColor = 'primary'
            soldierButtonColor = 'secondary'
        }
        else if (musteredUnit === 'soldier') {
            priestButtonColor = 'secondary'
            soldierButtonColor = 'primary'
        }
        else {
            priestButtonColor = 'secondary'
            soldierButtonColor = 'secondary'
        }
    }, [musteredUnit])

    const handleChoice = (e) => {
        setCommand(e.target.innerText.toLowerCase())
    }

    const handleConfirm = () => {

        if (command === 'advance') {
            if (advancingTerritory && clickedTerritory && (priestsMarching || soldiersMarching)) {

                let advanceOrder = 1
                commandList.forEach(command => {
                    if (command.type === 'advance') {
                        advanceOrder += 1
                    }
                })

                // creating advance command
                let advanceCommand = {
                    advanceOrder: advanceOrder,
                    type: 'advance',
                    originTerritory: advancingTerritory._id,
                    newTerritory: clickedTerritory._id,
                    issuedBy: userPlayerObject._id,
                    soldiersMarching: soldiersMarching,
                    priestsMarching: priestsMarching
                }
                setCommandList(prevArray => { return [...prevArray, advanceCommand] })

                // for visual feedback and clickability checking
                setTerritoriesWithConfirmedCommands(prevArray => { return [...prevArray, advancingTerritory] })
            } else {
                // send status command failed
                console.log('you"re quite bad at this game')
            }
        } else if (command === 'excise') {

            // creating excise command
            let exciseCommand = {
                type: 'excise',
                originTerritory: clickedTerritory._id,
                issuedBy: userPlayerObject._id
            }
            setCommandList(prevArray => { return [...prevArray, exciseCommand] })

            setTerritoriesWithConfirmedCommands(prevArray => { return [...prevArray, clickedTerritory] })
        } else if (command === 'muster') {

            // creating muster command
            let musterCommand = {
                type: 'muster',
                originTerritory: clickedTerritory._id,
                issuedBy: userPlayerObject._id,
                musteredUnit: musteredUnit
            }
            setCommandList(prevArray => { return [...prevArray, musterCommand] })

            setTerritoriesWithConfirmedCommands(prevArray => { return [...prevArray, clickedTerritory] })
        } else if (command === 'sow') {

            // creating sow command
            let sowCommand = {
                type: 'sow',
                originTerritory: clickedTerritory._id,
                issuedBy: userPlayerObject._id
            }
            setCommandList(prevArray => { return [...prevArray, sowCommand] })

            setTerritoriesWithConfirmedCommands(prevArray => { return [...prevArray, clickedTerritory] })
        }

        // reset states after command is pushed
        setSoldiersMarching(0)
        setPriestsMarching(0)
        setMusteredUnit(null)
        setAdvancingTerritory(null)
        setClickedTerritory(null)
        setPlayerState('selectTerritory')
        setCommand(null)
    }

    const handleBack = () => {
        setSoldiersMarching(0)
        setPriestsMarching(0)
        setMusteredUnit(null)
        setAdvancingTerritory(null)
        setClickedTerritory(null)
        setPlayerState('selectTerritory')
        setCommand(null)
    }

    useEffect(() => {
        //check if all data is chosen for a command to be confirmed
        setConfirmIsNOTClickable(() => {
            //excise or sow command
            if (command && ((command === 'excise' || command === 'sow')
                //advance command
                || (command === 'advance' && advancingTerritory && clickedTerritory && (priestsMarching || soldiersMarching))
                // muster command
                || (command === 'muster' && musteredUnit))) {
                return false
            } else {
                return true
            }
        })

    }, [command, advancingTerritory, clickedTerritory, priestsMarching, soldiersMarching, musteredUnit])

    let soldierMarchOptions = []
    let priestMarchOptions = []
    for (let i = 0; i <= advancingTerritory?.soldiers; i++) soldierMarchOptions.push(i)
    for (let i = 0; i <= advancingTerritory?.priests; i++) priestMarchOptions.push(i)

    if (clickedTerritory) {
        let priestImg = setPriest(userPlayerObject)
        let soldierImg = setSoldier(clickedTerritory)
    }

    return (
        <>
            <h2>Choose your command:</h2>
            <br />
            <div className="d-grid gap-2">
                {(clickedTerritory?.priests || clickedTerritory?.soldiers) &&

                    <Button onClick={handleChoice} variant='dark'>Advance</Button>
                }

                {command === 'advance' &&
                    <>
                        <span>
                            <img src={priestImg} />
                            <Dropdown title='Priests' onSelect={setPriestsMarching}>
                                {priestMarchOptions.map(number => (
                                    <Dropdown.Item key={number} value={number}>{number}</Dropdown.Item>
                                ))}
                            </Dropdown>
                        </span>
                        <span>
                            <img src={soldierImg} />
                            <Dropdown title='Soldiers' onSelect={setSoldiersMarching}>
                                {priestMarchOptions.map(number => (
                                    <Dropdown.Item key={number} value={number}>{number}</Dropdown.Item>
                                ))}
                            </Dropdown>
                        </span>
                    </>
                }


                {clickedTerritory?.priests &&

                    <Button onClick={handleChoice} variant='dark'>Excise</Button>
                }

                {(clickedTerritory?.priests && clickedTerritory?.population) &&

                    <Button onClick={handleChoice} variant='dark'>Muster</Button>
                }

                {(command === 'muster' && userPlayerObject.gold >= 2 && clickedTerritory?.population && clickedTerritory?.abundance) &&

                    <Button onClick={() => { setMusteredUnit('soldier') }} variant={soldierButtonColor}>Muster Soldier</Button>
                }

                {(command === 'muster' && userPlayerObject.gold >= 5 && clickedTerritory?.population && clickedTerritory?.abundance) &&

                    <Button onClick={() => { setMusteredUnit('priest') }} variant={priestButtonColor}>Muster Priest</Button>
                }

                {clickedTerritory?.population &&

                    <Button onClick={handleChoice} variant='dark'>Sow</Button>
                }
            </div>
            <br />
            <div>
                <Button onClick={handleConfirm} disabled={confirmIsNOTClickable}>CONFIRM COMMAND</Button>{'  '}
                <Button onClick={handleBack}>BACK</Button><br /><br />
            </div>
        </>
    )
}

export default CommandMenu