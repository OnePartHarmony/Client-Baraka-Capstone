import React, {useState} from 'react'
import { createGame } from '../api/game'
import { socket } from '../apiConfig'
import JoinGame from './JoinGame'

const NewGame = ({user, msgAlert}) => {

    const startGame = () => {
        //start new socket room
        socket.emit('createNewGame', (response) => {
            console.log("roomId",response.roomId)
        })

        //create game document
        // createGame(user)
        // .then(game => {
        //     console.log(game)
        // })
        // .catch(err => {
        //     msgAlert({
        //         heading: 'Failed to create game',
        //         message: err,
        //         variant: 'danger'
        //     })
        // })
    }

    return (
        <>
            <div className='newGameForm'>                
                <h3>Create a New Game</h3>                
                <button className='newGameButton btn btn-dark' onClick={startGame} style={{margin: 'auto'}}>
                    Create Game
                </button>                             
            </div>
            <JoinGame user={user} />
        </>
    )
}


export default NewGame