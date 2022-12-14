import React, {useEffect, useState} from 'react'
import { setPriest } from './setTerritoryImages'
import Territory from './Territory'

const GameBoard = (props) => {

    const {user, gameObject, clickedTerritory, setClickedTerritory, userPlayerObject, setUserPlayerObject, playerState, advancingTerritory, territoriesWithConfirmedCommands, hexWidth, setStatusArray} = props

    
    const [clickableBoard, setClickableBoard] = useState(false)

    //find the player object that belongs to the user
    useEffect(() => {        
        gameObject?.players.forEach(player => {
            if (player.user._id === user._id) {
                setUserPlayerObject(player)
            }
        })        
    }, [gameObject])

    //determine if any hexes at all should be clickable   
    useEffect(() => {
        if (gameObject && userPlayerObject &&((gameObject.command) || gameObject.placementOrder[0] === userPlayerObject.season)) {        
            setClickableBoard(true)
        } else if (gameObject?.command) {          
            setClickableBoard(true)
        } else {
            setClickableBoard(false)
        }
    }, [userPlayerObject])

    
    //establish empty array with length 37
    const territoriesJSX = Array(37)
    
    gameObject?.territories.forEach(territory => {
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

    
    const playerColor = (playerSeason) => {
        switch (playerSeason) {
            case 'spring' :
                return 'rgb(0, 255, 0)'
            case 'summer' :
                return 'rgb(225, 6, 6)'
            case 'autumn' :
                return 'rgb(200, 200, 200)'
            default :
                return 'rgb(0, 50, 255)'
        }
    }
    
    
    const playerStats = gameObject?.players.map((player,index) => (        
        <div key={index} className={`player${index}`}
        style={{
            color: playerColor(player.season), 
            position: 'absolute',
            padding: '1.4vw 1vw',
            borderRadius: '20%',
            zIndex: 1,
            fontSize: `${.16 * hexWidth}px`,
            textShadow: '0px 1px black'          
        }}
        >
            <p ><strong>{player.user.username}</strong><br/>
            <img src={setPriest(player)} alt={`${player.season} priest`} />{player.season}<br/>
            Gold: {player.gold}</p>
        </div>
    ))
    



    const hexBoard = (
        <>
            <div className='hexBoard' style={{height: 6.2 * hexWidth, zIndex: 3, margin: 'auto'}}>
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
            {playerStats}
        </>
        
    )


    
    return (
        <>
            {gameObject ? 
            hexBoard
            : 
            <h1>Waiting for game board....</h1>}
        </>        
    )
}


export default GameBoard