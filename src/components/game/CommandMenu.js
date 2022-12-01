import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'

const CommandMenu = (props) => {

    const { user, userPlayerObject, playerState, setPlayerState, clickedTerritory, setClickedTerritory, command, setCommand, setTerritoriesWithConfirmedCommands, advancingTerritory, setAdvancingTerritory} = props

    const [commandList, setCommandList] = useState([])
    const [soldiersMarching, setSoldiersMarching] = useState(0)
    const [priestsMarching, setPriestsMarching] = useState(0)
    const [musteredUnit, setMusteredUnit] = useState(null)
    const [confirmIsNOTClickable, setConfirmIsNOTClickable] = useState(true)

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
                setCommandList(prevArray => {return [...prevArray, advanceCommand]})

                // for visual feedback and clickability checking
                setTerritoriesWithConfirmedCommands(prevArray => {return [...prevArray, advancingTerritory]})                
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
            setCommandList(prevArray => {return [...prevArray, exciseCommand]})

            setTerritoriesWithConfirmedCommands(prevArray => {return [...prevArray, clickedTerritory]})
        } else if (command === 'muster') {

            // creating muster command
            let musterCommand = {
                type: 'muster',
                originTerritory: clickedTerritory._id,
                issuedBy: userPlayerObject._id,
                musteredUnit: musteredUnit
            }
            setCommandList(prevArray => {return [...prevArray, musterCommand]})

            setTerritoriesWithConfirmedCommands(prevArray => {return [...prevArray, clickedTerritory]})
        } else if (command === 'sow') {

            // creating sow command
            let sowCommand = {
                type: 'sow',
                originTerritory: clickedTerritory._id,
                issuedBy: userPlayerObject._id
            }
            setCommandList(prevArray => {return [...prevArray, sowCommand]})

            setTerritoriesWithConfirmedCommands(prevArray => {return [...prevArray, clickedTerritory]})
        }

        // reset states after command is pushed
        setMusteredUnit(null)
        setAdvancingTerritory(null)
        setClickedTerritory(null)
        setPlayerState('selectTerritory')
        setCommand(null)
    }

    const handleBack = () => {
        setMusteredUnit(null)
        setAdvancingTerritory(null)
        setClickedTerritory(null)
        setPlayerState('selectTerritory')
        setCommand(null)
    }

    const handleIssueCommands = () => {
        //TODO all the socket stuff, Harmony, HELP!

        setMusteredUnit(null)
        setAdvancingTerritory(null)
        setClickedTerritory(null)
        setPlayerState('wait')
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
            || (command === 'muster' && musteredUnit ))) {
                return false
            } else {
                return true
            }
        })
        
    }, [command, advancingTerritory, clickedTerritory, priestsMarching, soldiersMarching, musteredUnit])
    

    return (
        <>
            <h2>Choose your command:</h2>
            <br />
            <div className="d-grid gap-2">
                <Button onClick={handleChoice} variant='dark'>Advance</Button>
                {command === 'advance' &&
                    <>TODO Advance Form</>
                }
                <Button onClick={handleChoice} variant='dark'>Excise</Button>
                <Button onClick={handleChoice} variant='dark'>Muster</Button>
                {command === 'muster' &&
                    <>TODO Muster Form</>
                    // <>
                    //     <Button onClick={() => {setMusteredUnit('soldier')}} variant='secondary'>Muster Soldier</Button>
                    //     <Button onClick={() => {setMusteredUnit('priest')}} variant='secondary'>Muster Priest</Button>
                    // </>
                }
                <Button onClick={handleChoice} variant='dark'>Sow</Button>
            </div>
            <br />
            <div>
                <Button onClick={handleConfirm} disabled={confirmIsNOTClickable} >CONFIRM</Button>{'  '}
                <Button onClick={handleBack}>BACK</Button><br/><br/>
                <Button onClick={handleIssueCommands} variant='danger'>ISSUE ALL COMMANDS</Button>
            </div>

            {/* ///NEED button to issue all commands, which should first trigger a way to order Advance commands///// */}
        </>
    )
}

export default CommandMenu