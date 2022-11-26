import React, { useState } from 'react'
import GameBoard from './GameBoard'
import StatusBar from './StatusBar'
import ActionMenu from './ActionMenu'

const Game = (props) => {

    const {user} = props

    return (
        <div className='game'>
            <div className='gameLeft'>
                <GameBoard user={user}/>
                <StatusBar user={user}/>
            </div>            
            <ActionMenu user={user}/>
        </div>
    )
}

export default Game
