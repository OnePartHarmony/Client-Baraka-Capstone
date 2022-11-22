import React, {useState} from 'react'
import { createGame } from '../api/game'


const NewGame = ({user, msgAlert}) => {

    const startGame = () => {
        createGame(user)
        .then(game => {
            console.log(game)
        })
        .catch(err => {
            msgAlert({
                heading: 'Failed to create game',
                message: err,
                variant: 'danger'
            })
        })
    }

    return (
        <>
            <div className='newGameForm'>                
                <h3>Create a New Game</h3>                
                <button className='newGameButton btn btn-dark' onClick={startGame} style={{margin: 'auto'}}>
                    Create Game
                </button>                             
            </div>
        </>
    )
}


export default NewGame