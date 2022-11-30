import React, {useState} from 'react'
import { Button } from 'react-bootstrap'

const CommandMenu = (props) => {

    const { user, playerState, setPlayerState, clickedTerritory, setClickedTerritory, command, setCommand} = props

    

    const handleChoice = (e) => {
        setCommand(e.target.innerText.toLowerCase())
    }

    const handleConfirm = () => {

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