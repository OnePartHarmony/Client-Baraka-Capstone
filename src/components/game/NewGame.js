import React, {useState} from 'react'
import { createGame } from '../../api/game'
import { socket } from '../../apiConfig'

const NewGame = (props) => {

    const {user, setUser, msgAlert, setJoinedGame} = props
    const [playerCount, setPlayerCount] = useState(2)
    
    const handleChange = (e) => {
        setPlayerCount(e.target.value)
    }

    const startGame = () => {
        //start new socket room
        // socket.emit('createNewGame', user, playerCount, (response) => {
        //     if (response.error){
        //         console.log(response.error)
        //     } else {
        //         setUser(response.user)
        //         console.log("roomId",response.roomId)
        //         console.log("game", response.game)
        //     }            
        // })        

        createGame(user, playerCount)
            .then(res => {
                console.log(res.game)
                setUser(res.user)
            })
            .then(setJoinedGame(true))
            .catch(err => {
                msgAlert({
					heading: 'Failed to create game',
					message: err.message,
					variant: 'danger',
				})
                console.log(err)
            })
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
