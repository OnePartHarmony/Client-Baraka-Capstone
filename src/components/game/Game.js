import React, { useState } from 'react'
import GameBoard from './GameBoard'
import ActionMenu from './ActionMenu'
import { socket } from '../../apiConfig'

const Game = (props) => {

    const {user} = props
    
    const [statusArray, setStatusArray] = useState([])

    
    socket.on('status', (arg) => {
        let newStatArray = statusArray.slice()
        newStatArray.unshift(arg.message)
        setStatusArray(newStatArray)
    })
    
    const statusDisplay = statusArray.map((item, index) => (        
        <span key={index}>{item}<br/></span>                             
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
