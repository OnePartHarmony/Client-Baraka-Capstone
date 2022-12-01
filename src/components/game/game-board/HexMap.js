import React from 'react'
import Territory from './Territory'

const HexMap = (props) => {

    const {userPlayerObject, gameObject, territories, hexWidth, clickedTerritory, setClickedTerritory, clickableBoard, playerState, advancingTerritory, territoriesWithConfirmedCommands} = props


    //establish empty array with length 37
    const territoriesJSX = Array(37)
    
    territories.forEach(territory => {
        //put each territory into array in order by number
        territoriesJSX.splice(territory.number, 1, (
            <Territory
                key={territory.number}
                gameObject={gameObject}
                userPlayerObject={userPlayerObject}
                territory={territory}
                hexWidth={hexWidth}
                clickedTerritory={clickedTerritory}
                setClickedTerritory={setClickedTerritory}
                clickableBoard={clickableBoard}
                playerState={playerState}
                advancingTerritory={advancingTerritory}
                territoriesWithConfirmedCommands={territoriesWithConfirmedCommands}
            />
        ))
    })

    return (
        <div className='hexBoard' style={{height: 6.5 * hexWidth}}>
            <div className='hexRow hexRow1'>
                {territoriesJSX.slice(0,4)}
            </div>
            <div className='hexRow hexRow2' style={{ top: -.3 * hexWidth }}>
                {territoriesJSX.slice(4,9)}
            </div>
            <div className='hexRow hexRow3' style={{ top: -.6 * hexWidth}}>
                {territoriesJSX.slice(9,15)}
            </div>
            <div className='hexRow hexRow4' style={{ top: -.9 * hexWidth}}>
                {territoriesJSX.slice(15,22)}
            </div>
            <div className='hexRow hexRow5' style={{ top: -1.2 * hexWidth}}>
                {territoriesJSX.slice(22,28)}
            </div>
            <div className='hexRow hexRow6' style={{ top: -1.5 * hexWidth}}>
                {territoriesJSX.slice(28,33)}
            </div>
            <div className='hexRow hexRow7' style={{ top: -1.8 * hexWidth}}>
                {territoriesJSX.slice(33,37)}
            </div>
        </div>
)}

export default HexMap