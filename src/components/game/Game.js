import React from 'react'
import GameBoard from './GameBoard'
import StatusBar from './StatusBar'
import ActionMenu from './ActionMenu'

const Game = (props) => {

    const [user] = props

    return (
        <>
            <GameBoard user={user}/>
            <StatusBar user={user}/>
            <ActionMenu user={user}/>
        </>
    )
}

export default Game