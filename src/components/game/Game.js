import React, {useState} from 'react'
import GameBoard from './game-board/GameBoard'
import ActionMenu from './ActionMenu'

const Game = (props) => {

    const {user, statusArray, gameObject} = props
    const [clickedTerritory, setClickedTerritory] = useState('')
    
    const statusDisplay = statusArray.map((item, index) => (        
        <span key={index}>{item}<br/></span>                             
    ))
    

    return (
        <div className='game'>

            <div className='gameLeft'>
                <GameBoard
                    user={user}
                    gameObject={gameObject}
                    clickedTerritory={clickedTerritory}
                    setClickedTerritory={setClickedTerritory}
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
