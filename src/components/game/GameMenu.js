import React, { useEffect, useState } from 'react'
import { socket } from '../../apiConfig'
import Game from './Game'
import JoinGame from './JoinGame'
import NewGame from './NewGame'
import { createGame } from '../../api/game'
import { Navbar } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'

const GameMenu = (props) => {

    const { user, setUser, msgAlert, joinedGame, setJoinedGame, statusArray, setStatusArray, gameObject, clearGameStates, wonOrLost} = props
    
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
    
    //set status array as separate items in status bar, every other is red to show changes
    const statusDisplay = statusArray.map((item, index) => {
        let color
        if (statusArray.length % 2 === 0) {
            if (index % 2 === 0) {
                color = 'rgba(255,0,0,.3)'
            } else {
                color = 'rgba(0,0,0,0)'
            }
        } else {
            if (index % 2 === 0) {
                color = 'rgba(0,0,0,0)'
            } else {
                color = 'rgba(255,0,0,.3)'
            }
        }        
        return ( <span key={index} style={{background: color}}>{item}<br/></span>  )                                    
    })

    let seasonalColor = 'white'
    switch (gameObject?.currentSeason) {
        case 'spring' :
            seasonalColor = 'rgb(0, 255, 0)'
            break
        case 'summer' :
            seasonalColor = 'rgb(225, 6, 6)'
            break
        case 'autumn' :
            seasonalColor = 'rgb(200, 200, 200)'
            break
        default :
            seasonalColor = 'rgb(100, 196, 255)'
    }



    return (
        <>
            <Navbar className='statNav' variant='dark' expand='md'>
                    <div className='statusBar'>
                        {/* for scrollbar display */}
                        <div className='innerStatus'>
                            <p>
                                {statusDisplay}
                            </p>
                        </div>                                            
                    </div>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <NavbarCollapse>
                        <div className='roomStats' style={{color: seasonalColor}}>
                            <p>Room: {user.gameRoomId}</p>
                            <p>Current Season: {gameObject?.currentSeason ? gameObject?.currentSeason.charAt(0).toUpperCase() + gameObject?.currentSeason.slice(1) : null}</p>
                        </div>
                    </NavbarCollapse>
            </Navbar>
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
        </>

    )
}

export default GameMenu