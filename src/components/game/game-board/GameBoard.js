import React, {useEffect, useState} from 'react'
import Territory from './Territory'


const GameBoard = (props) => {

    const {user, gameObject, clickedTerritory, setClickedTerritory, userPlayerObject, setUserPlayerObject, playerState, advancingTerritory, territoriesWithConfirmedCommands, hexWidth} = props

    
    const [clickableBoard, setClickableBoard] = useState(false)


    useEffect(() => {
        //find the player object that belongs to the user
        if (gameObject) {
                    gameObject.players.forEach(player => {
                        if (player.user._id === user._id) {
                            setUserPlayerObject(player)
                        }
                    })
                }
    }, [gameObject])

    
    useEffect(() => {
        if (gameObject && userPlayerObject &&((gameObject.command) || gameObject.placementOrder[0] === userPlayerObject.season)) {            
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
                return 'rgb(255, 0, 0)'
            case 'autumn' :
                return 'rgb(200, 200, 200)'
            default :
                return 'rgb(0, 0, 255)'
        }
    }
    
    const playerStats = gameObject?.players.map((player,index) => {
        <div key={index} className={`player${index}`}>
            <p>{player.user.username}</p>
            <p>{player.season}</p>
            <p>Gold: {player.gold}</p>
        </div>
    })    



    const hexBoard = (
        <div className='hexBoard' style={{height: 6.5 * hexWidth, zIndex: 3}}>
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
    )




    let display = gameObject ? 
        hexBoard
        : 
        (<h1>Waiting for game board....</h1>)


    return (
        <>
            {display}
        </>        
    )
}


export default GameBoard