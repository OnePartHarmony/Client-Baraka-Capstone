import React, { useEffect, useState } from 'react'
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
    }, [])
    

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