import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { socket } from '../../apiConfig'
import JoinGame from './JoinGame'
import NewGame from './NewGame'
import { createGame } from '../../api/game'

const ChangeGame = (props) => {

    const {user, setUser, msgAlert} = props

    const navigate = useNavigate()
    
    const [joinedGame, setJoinedGame] = useState(false)
    const [roomId, setRoomId] = useState('')
    const [playerCount, setPlayerCount] = useState(2)

    useEffect(() => {
        if (joinedGame === true) {
                navigate('/gameMenu')
        }
    }, [joinedGame])
    

    const joinGame = () => {
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
        createGame(user, playerCount)
            .then(res => {
                console.log(res.data.game)
                setUser(res.data.user)
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
        <div>
            <h1 style={{width: 'max-content', margin: '4vh auto'}}>Would you like to join a different game?</h1>
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
        </div>        
    )
}

export default ChangeGame