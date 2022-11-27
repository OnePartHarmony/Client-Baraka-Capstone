import React, { useState } from 'react'
import Game from './Game'
import JoinGame from './JoinGame'
import NewGame from './NewGame'

const GameMenu = (props) => {

    const {user} = props

    const [joinedGame, setJoinedGame] = useState(false)


    return (
        <div className='game'>
            {joinedGame  ? 
                <>
                    <Game user={user} />
                </>                
                :
                <>
                    <NewGame user={user} setJoinedGame={setJoinedGame}/>
                    <JoinGame user={user} setJoinedGame={setJoinedGame}/>
                </>                
            }
            
        </div>
    )
}

export default GameMenu