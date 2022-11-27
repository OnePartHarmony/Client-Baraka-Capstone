import React, { useEffect, useState } from 'react'
import GameBoard from './GameBoard'
import ActionMenu from './ActionMenu'
import { socket } from '../../apiConfig'

const Game = (props) => {

    const {user} = props

    const [statusArray, setStatusArray] = useState(['Waiting for other players...'])

    
    socket.on('status', (arg) => {
        let newStatArray = statusArray.slice()
        console.log(newStatArray)
        newStatArray.push(arg.message)
        setStatusArray(newStatArray)
    })
    
    const statusDisplay = statusArray.map((item, index) => (
        <p key={index}>{item}</p>                
    ))
    

    return (
        <div className='game'>
          
            <div className='gameLeft'>
                <GameBoard user={user}/>
                <div className='statusBar'>
                    {statusDisplay}
                </div>
            </div>
            
            <ActionMenu user={user}/>
            
        </div>
    )
}

export default Game