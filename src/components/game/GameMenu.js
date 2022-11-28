import React, { useState } from 'react'
import { socket } from '../../apiConfig'
import Game from './Game'
import JoinGame from './JoinGame'
import NewGame from './NewGame'

const GameMenu = (props) => {

    const {user, setUser, msgAlert, joinedGame, setJoinedGame} = props
    
    const [roomId, setRoomId] = useState('')


    const joinGame = () => {
        setJoinedGame(true)
        socket.emit('joinGame', roomId, user, (response) => {
            setUser(response.user)
        })

        //create player document 
    }

    if (joinedGame === false && user.gameRoomId) {              
        socket.emit('reJoinGame', user.gameRoomId, (response) => {
            console.log("reJoined?",response.message)
        })
        setJoinedGame(true)  
    }

    return (
        <div className='game'>
            {joinedGame  ? 
                <>
                    <Game user={user} />
                </>                
                :
                <>
                    <NewGame user={user} setJoinedGame={setJoinedGame} setUser={setUser} msgAlert={msgAlert}/>
                    <JoinGame roomId={roomId} setRoomId={setRoomId} joinGame={joinGame}/>
                </>                
            }
            
        </div>
    )
}

export default GameMenu