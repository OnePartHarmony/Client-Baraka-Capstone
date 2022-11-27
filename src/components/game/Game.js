import React, { useState } from 'react'
import GameBoard from './GameBoard'
import ActionMenu from './ActionMenu'
import { socket } from '../../apiConfig'

const Game = (props) => {

    const {user} = props

    const [statusArray, setStatusArray] = useState(['Waiting for other players...'])

    
    socket.on('status', (arg) => {
        let newStatArray = statusArray.slice()
        newStatArray.push(arg.message)
        setStatusArray(newStatArray)
    })
    
    const statusDisplay = statusArray.map((item, index) => (
        <>            
            <span key={index}>{item}</span>
            <br/>
        </>
                     
    ))
    

    return (
        <div className='game'>
          
            <div className='gameLeft'>
                <GameBoard user={user}/>
                <div className='statusBar'>
                    <p>
                        {statusDisplay}
                    </p>
                    
                </div>
            </div>
            
            <ActionMenu user={user}/>
            
        </div>
    )
}

export default Game