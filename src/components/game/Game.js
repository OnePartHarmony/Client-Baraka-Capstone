import React from 'react'
import GameBoard from './GameBoard'
import ActionMenu from './ActionMenu'

const Game = (props) => {

    const {user, statusArray, gameObject} = props
    
    
    const statusDisplay = statusArray.map((item, index) => (        
        <span key={index}>{item}<br/></span>                             
    ))
    

    return (
        <div className='game'>

            <div className='gameLeft'>
                <GameBoard
                    user={user}
                    gameObject={gameObject}
                />
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
