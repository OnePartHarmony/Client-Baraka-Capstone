import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

const CombatMenu = (props) => {

    const dice = {
        'Hedgehog': "0, 5, 5, 5, 5, 5",
        'Phalanx': "1, 1, 6, 6, 6, 6",
        'Skirmish': "2, 2, 2, 7, 7, 7",
        'Flanking': "3, 3, 3, 3, 8, 8",
        'Charging': "4, 4, 4, 4, 4, 9"
    }

    const { formation, setFormation, setConfirmedFormation } = props

    const handleClick = (e) => {
        setFormation(e.target.innerText)
    }

    const confirmFormation = () => {
        setConfirmedFormation(formation)
    }

    return (
        <>
            <h2>Choose your combat formation:</h2>
            <br />
            <div className="d-grid gap-2">
                <Button
                    onClick={handleClick}
                    variant="dark"
                    disabled={formation === 'Hedgehog' ? 'true' : false}
                >Hedgehog</Button>
                <Button
                    onClick={handleClick}
                    variant="dark"
                    disabled={formation === 'Phalanx' ? 'true' : false}
                >Phalanx</Button>
                <Button
                    onClick={handleClick}
                    variant="dark"
                    disabled={formation === 'Skirmish' ? 'true' : false}
                >Skirmish</Button>
                <Button
                    onClick={handleClick}
                    variant="dark"
                    disabled={formation === 'Flanking' ? 'true' : false}
                >Flanking</Button>
                <Button
                    onClick={handleClick}
                    variant="dark"
                    disabled={formation === 'Charging' ? 'true' : false}
                >Charging</Button>
            </div>
            <br />
            <div>
                {formation &&
                    <h3>{formation} die is selected, its faces are {dice[formation]}.</h3>
                }
            </div>
            <br />
            <div>
                <Button variant='warning' className='mb-3' onClick={confirmFormation}>CONFIRM FORMATION</Button>
            </div>
        </>
    )
}

export default CombatMenu