import React, {useState} from 'react'
import { createGame } from '../../api/game'
import { socket } from '../../apiConfig'

const NewGame = (props) => {

    const {user, msgAlert, setJoinedGame} = props

    const [playerCount, setPlayerCount] = useState(2)

    const handleChange = (e) => {
        setPlayerCount(e.target.value)        
    }

    const startGame = () => {
        //start new socket room
        socket.emit('createNewGame', user, playerCount, (response) => {
            setJoinedGame(true)
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
