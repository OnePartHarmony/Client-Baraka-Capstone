import React, {useEffect, useState} from 'react'
import GameBoard from './game-board/GameBoard'
import ActionMenu from './ActionMenu'
import { socket } from '../../apiConfig'

const Game = (props) => {

    const {user, statusArray, gameObject} = props
    const [clickedTerritory, setClickedTerritory] = useState(null)
    const [playerState, setPlayerState] = useState('wait')
    const [userPlayerObject, setUserPlayerObject] = useState({})
    const [advancingTerritory, setAdvancingTerritory] = useState(null)
    const [territoriesWithConfirmedCommands, setTerritoriesWithConfirmedCommands] = useState([])
    
    const statusDisplay = statusArray.map((item, index) => (        
        <span key={index}>{item}<br/></span>                             
    ))

    //initial placement function
    useEffect(() => {
        if (clickedTerritory && gameObject.placementOrder.length > 0){
            socket.emit('initialUnitPlacement', clickedTerritory._id, userPlayerObject._id, gameObject._id)
            setClickedTerritory(null)
        }
    }, [clickedTerritory])
    

    useEffect(()=> {
        if (gameObject?.command) {
            setPlayerState('selectTerritory')
        }
    }, [gameObject])

    useEffect(() => {
        if (playerState === 'selectTerritory' && clickedTerritory) {
            setPlayerState('selectCommand')
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
                    advancingTerritory={advancingTerritory}
                    territoriesWithConfirmedCommands={territoriesWithConfirmedCommands}
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
                advancingTerritory={advancingTerritory}
                setAdvancingTerritory={setAdvancingTerritory}
                setTerritoriesWithConfirmedCommands={setTerritoriesWithConfirmedCommands}
                userPlayerObject={userPlayerObject}
            />
            
        </div>
    )
}

export default Game
