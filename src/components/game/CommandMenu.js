import React, {useState} from 'react'
import { Button } from 'react-bootstrap'

const CommandMenu = (props) => {

    const { user, userPlayerObject, playerState, setPlayerState, clickedTerritory, setClickedTerritory, command, setCommand, setTerritoriesWithConfirmedCommands, advancingTerritory, setAdvancingTerritory} = props

    const [commandList, setCommandList] = useState([])
    const [soldiersMarching, setSoldiersMarching] = useState(0)
    const [priestsMarching, setPriestsMarching] = useState(0)

    const handleChoice = (e) => {
        setCommand(e.target.innerText.toLowerCase())
    }

    const handleConfirm = () => {

        if (command === 'advance') {
            if (advancingTerritory && clickedTerritory && (priestsMarching || soldiersMarching)) {
                // creating advance command
                let advanceCommand = {
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
        } else {

            ////ADD MORE STUFF HERE//////

            setTerritoriesWithConfirmedCommands(prevArray => {return [...prevArray, clickedTerritory]})
        }

        // reset states after command is pushed
        setAdvancingTerritory(null)
        setClickedTerritory(null)
        setPlayerState('selectTerritory')
        setCommand(null)
    }

    const handleBack = () => {
        setCommand(null)
        setClickedTerritory(null)
        setPlayerState('selectTerritory')
    }

    return (
        <>
            <h2>Choose your command:</h2>
            <br />
            <div className="d-grid gap-2">
                <Button onClick={handleChoice} variant="dark">Advance</Button>
                {command === 'advance' &&
                    <>TODO Advance Form</>
                }
                <Button onClick={handleChoice} variant="dark">Excise</Button>
                <Button onClick={handleChoice} variant="dark">Muster</Button>
                <Button onClick={handleChoice} variant="dark">Sow</Button>
            </div>
            <br />
            <div>
                <Button onClick={handleConfirm} variant='danger'>CONFIRM</Button>{'  '}
                <Button onClick={handleBack}>BACK</Button>
            </div>
        </>
    )
}

export default CommandMenu