import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { socket } from '../../apiConfig'
import JoinGame from './JoinGame'
import NewGame from './NewGame'

const ChangeGame = (props) => {

    const {user, setUser, msgAlert} = props

    const navigate = useNavigate()
    
    const [joinedGame, setJoinedGame] = useState(false)
    const [roomId, setRoomId] = useState('')

    if (joinedGame === true) {
        navigate('/game')
    }

    const joinGame = () => {        
        socket.emit('joinGame', roomId, user, (response) => {
            setUser(response.user)
        })
        setJoinedGame(true)
    }    

    return (        
        <div>
            <h1 style={{width: 'max-content', margin: '4vh auto'}}>Would you like to join a different game?</h1>
            <NewGame user={user} setJoinedGame={setJoinedGame} setUser={setUser} msgAlert={msgAlert}/>
            <JoinGame roomId={roomId} setRoomId={setRoomId} joinGame={joinGame}/>
        </div>        
    )
}

export default ChangeGame