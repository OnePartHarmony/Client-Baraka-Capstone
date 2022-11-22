import React, {useState} from 'react'
import mapTerritories from './territories'

const placeholderTerritories = []
for (let i=0; i<37; i++){
    let landType
    if (i%4 === 0) {
        landType = 'farmland'  
    } else if (i % 3 === 0) {
        landType = 'empty'
    } else if (i % 2 === 0) {
        landType = 'field'
    } else {
        landType = 'water'
    }
    placeholderTerritories.push({
        number: i,
        type: landType
    })
}

const GameBoard = ({user}) => {

    const [clickedTerritory, setClickedTerritory] = useState(false)

    const clickFunction = () => {
        // e.preventDefault()
        // setClickedTerritory(e.target.id)
        setClickedTerritory(prev => !prev)
    }

    const territories = mapTerritories(placeholderTerritories, clickFunction)

    return (
        <div className='gameBoard'>
            {territories}
            
        </div>
    )
}


export default GameBoard