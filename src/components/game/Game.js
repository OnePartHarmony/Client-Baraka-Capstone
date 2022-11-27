import React, { useState } from 'react'
import GameBoard from './GameBoard'
import ActionMenu from './ActionMenu'
import { socket } from '../../apiConfig'

const Game = (props) => {

    const {user} = props

    const [status, setStatus] = useState('Waiting for other players...')

    socket.on('status', (arg) => {setStatus(arg.message)})

    return (
        <div className='game'>
          
            <div className='gameLeft'>
                <GameBoard user={user}/>
                <div className='statusBar'>
                    {status}
                </div>
            </div>            
            <ActionMenu user={user}/>
            
        </div>
    )
}

export default Game