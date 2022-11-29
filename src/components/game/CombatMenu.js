import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

const CombatMenu = ({ user }) => {

    const dice = {
        'Hedgehog': "0, 5, 5, 5, 5, 5",
        'Phalanx': "1, 1, 6, 6, 6, 6",
        'Skirmish': "2, 2, 2, 7, 7, 7",
        'Flanking': "3, 3, 3, 3, 8, 8",
        'Charging': "4, 4, 4, 4, 4, 9"
    }

    const [selection, setSelection] = useState(null)

    const handleClick = (e) => {
        setSelection(e.target.innerText)
    }

    return (
        <>
            <h2>Choose your combat formation:</h2>
            <br />
            <div className="d-grid gap-2">
                <Button onClick={handleClick} variant="dark">Hedgehog</Button>
                <Button onClick={handleClick} variant="dark">Phalanx</Button>
                <Button onClick={handleClick} variant="dark">Skirmish</Button>
                <Button onClick={handleClick} variant="dark">Flanking</Button>
                <Button onClick={handleClick} variant="dark">Charging</Button>
            </div>
            <br />
            <div>
                {selection &&
                    <h3>Roll the {selection} die, its faces are {dice[selection]}.</h3>
                }
            </div>
            <br />
            <div>
                <Button variant='success'>CONFIRM</Button>{' '}
                <Button variant='danger'>CANCEL</Button>
            </div>
        </>
    )
}

export default CombatMenu