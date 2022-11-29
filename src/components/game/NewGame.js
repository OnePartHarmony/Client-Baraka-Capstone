import React, {useState} from 'react'

const NewGame = (props) => {

    const {startGame, playerCount, setPlayerCount} = props
    
    
    const handleChange = (e) => {
        setPlayerCount(e.target.value)
    }

    return (
        <>
            <div className='newGameForm'>
                <h3>Create a New Game</h3>
                <label>Number of Players:</label>
                <input type='number' min='2' max='4' value={playerCount} onChange={handleChange}/>
                <br/>
                <button className='newGameButton btn btn-dark' onClick={startGame} style={{margin: 'auto'}}>
                    Create Game
                </button>                             
            </div>
        </>
    )
}


export default NewGame
