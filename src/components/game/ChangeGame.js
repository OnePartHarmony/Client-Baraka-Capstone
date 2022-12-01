import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { socket } from '../../apiConfig'
import JoinGame from './JoinGame'
import NewGame from './NewGame'
import { createGame } from '../../api/game'

const ChangeGame = (props) => {

    const {user, setUser, msgAlert, clearGameStates} = props

    const navigate = useNavigate()
    
    const [joinedNewGame, setJoinedNewGame] = useState(false)
    const [roomId, setRoomId] = useState('')
    const [playerCount, setPlayerCount] = useState(2)

    useEffect(() => {
        if (joinedNewGame === true) {
                navigate('/')
        }
    }, [joinedNewGame])
    

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
                setJoinedNewGame(true)                
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
                setJoinedNewGame(true)
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

    return (        
        <div>
            <h1 style={{width: 'max-content', margin: '4vh auto'}}>Would you like to join a different game?</h1>
            <NewGame
                user={user}
                setJoinedGame={setJoinedNewGame}
                setUser={setUser}
                msgAlert={msgAlert}                        
                startGame={startGame}
                playerCount={playerCount}
                setPlayerCount={setPlayerCount}
            />
            <JoinGame roomId={roomId} setRoomId={setRoomId} joinGame={joinGame}/>
        </div>        
    )
}

export default ChangeGame