import React, {useState} from 'react'

const NewGame = (props) => {

    const {startGame, playerCount, setPlayerCount} = props
    
    
    const handleChange = (e) => {
        setPlayerCount(e.target.value)
    }

    return (
        <>
            <div className='newGameForm'>
                <h3 className='mb-4'>Create a New Game</h3>
                <label>Number of Players:</label>
                <br />
                <input type='number' min='2' max='4' value={playerCount} onChange={handleChange} style={{width: 'max-content'}}/>
                <br/>
                <button className='newGameButton btn btn-dark mt-2' onClick={startGame} style={{margin: 'auto'}}>
                    Create Game
                </button>                             
            </div>
        </>
    )
}


export default NewGame
