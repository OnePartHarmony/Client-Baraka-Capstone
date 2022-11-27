import React, { useState } from 'react'
import { socket } from '../../apiConfig'
import Game from './Game'
import JoinGame from './JoinGame'
import NewGame from './NewGame'

const GameMenu = (props) => {

    const {user} = props
    
    const [joinedGame, setJoinedGame] = useState(false)
    const [roomId, setRoomId] = useState('')


    const joinGame = () => {
        setJoinedGame(true)
        socket.emit('joinGame', roomId, user, (response) => {            
            console.log("joined?",response.message)
        })

        //create player document 
    }

    if (joinedGame === false && user.gameRoomId) {
        setJoinedGame(true)
        Promise.resolve(setRoomId(user.gameRoomId))
            .then(socket.emit('reJoinGame', roomId, user, (response) => {            
                console.log("reJoined?",response.message)
            }))
    }

    return (
        <div className='game'>
            {joinedGame  ? 
                <>
                    <Game user={user} />
                </>                
                :
                <>
                    <NewGame user={user} setJoinedGame={setJoinedGame}/>
                    <JoinGame user={user} setJoinedGame={setJoinedGame} roomId={roomId} setRoomId={setRoomId} joinGame={joinGame}/>
                </>                
            }
            
        </div>
    )
}

export default GameMenu