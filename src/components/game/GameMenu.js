import React, { useEffect, useState } from 'react'
import { socket } from '../../apiConfig'
import Game from './Game'
import JoinGame from './JoinGame'
import NewGame from './NewGame'
import { createGame } from '../../api/game'


const GameMenu = (props) => {

    const {user, setUser, msgAlert, joinedGame, setJoinedGame, statusArray, setStatusArray, gameObject, clearGameStates, wonOrLost} = props
    
    const [roomId, setRoomId] = useState('')
    const [playerCount, setPlayerCount] = useState(2)

    const joinGame = () => {
        clearGameStates()
        socket.emit('joinGame', roomId, user, (response) => {
            if (response.invalid) {
                msgAlert({
                    heading: 'Could not join game',
                    message: response.invalid,
                    variant: 'danger',
                })
                console.log(response.invalid)
            } else {
                setUser(response.user)
                console.log("joinGame", response.message)
                setJoinedGame(true)                
            }
            console.log("Joined?",response.message)            
        })
    }

    const startGame = () => {
        clearGameStates()
        createGame(user, playerCount)
            .then(res => {
                // console.log(res.data.game)
                setUser(res.data.user)
                setJoinedGame(true)
            })
            .catch(err => {
                msgAlert({
					heading: 'Failed to create game',
					message: err.message,
					variant: 'danger',
				})
                console.log(err)
            })
    }

    useEffect(() => {
       if (joinedGame === false && user.gameRoomId) {              
            socket.emit('reJoinGame', user, (response) => {
                if (response.invalid) {
                    msgAlert({
                        heading: 'Could not automatically rejoin game',
                        message: response.invalid,
                        variant: 'danger',
                    })
                    console.log(response.invalid)
                } else {
                    setJoinedGame(true)
                }
                console.log("reJoined?",response.message)
            })              
        } 
    }, [user, joinedGame])

    useEffect(() => {
        ///NEED TO handle win or loss
        console.log(`${user.username} ${wonOrLost} the game.`)
    }, [wonOrLost])
    

    return (
        <div className='game'>
            {joinedGame  ? 
                <>
                    <Game
                        user={user}
                        statusArray={statusArray}
                        setStatusArray={setStatusArray}
                        gameObject={gameObject}
                    />
                </>                
                :
                <>
                    <NewGame
                        user={user}
                        setJoinedGame={setJoinedGame}
                        setUser={setUser}
                        msgAlert={msgAlert}                        
                        startGame={startGame}
                        playerCount={playerCount}
                        setPlayerCount={setPlayerCount}
                    />
                    <JoinGame roomId={roomId} setRoomId={setRoomId} joinGame={joinGame}/>
                </>                
            }
            
        </div>
    )
}

export default GameMenu