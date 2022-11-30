import React, {useEffect, useState} from 'react'
import GameBoard from './game-board/GameBoard'
import ActionMenu from './ActionMenu'
import socket from '../../apiConfig'

const Game = (props) => {

    const {user, statusArray, gameObject} = props
    const [clickedTerritory, setClickedTerritory] = useState(null)
    const [playerState, setPlayerState] = useState('wait')
    const [userPlayerObject, setUserPlayerObject] = useState({})
    
    const statusDisplay = statusArray.map((item, index) => (        
        <span key={index}>{item}<br/></span>                             
    ))

    useEffect(() => {
        if (clickedTerritory){
            socket.emit('initialUnitPlacement', clickedTerritory, userPlayerObject._id, gameObject._id)
        }
    }, [clickedTerritory])
    

    return (
        <div className='game'>

            <div className='gameLeft'>
                <GameBoard
                    user={user}
                    gameObject={gameObject}
                    clickedTerritory={clickedTerritory}
                    setClickedTerritory={setClickedTerritory}
                    playerState={playerState}
                    setPlayerState={setPlayerState}
                    userPlayerObject={userPlayerObject}
                    setUserPlayerObject={setUserPlayerObject}
                />
                <div className='statusBar'>
                    <p>
                        {statusDisplay}
                    </p>
                    
                </div>
            </div>
            
            <ActionMenu
                user={user}
                clickedTerritory={clickedTerritory}
                setClickedTerritory={setClickedTerritory}
                playerState={playerState}
                setPlayerState={setPlayerState}
            />
            
        </div>
    )
}

export default Game
