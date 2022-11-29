import React, {useEffect, useState} from 'react'
import mapTerritories from './territories'

const placeholderTerritories = []
for (let i=0; i<37; i++){
    let landType
    if (i%5 === 0) {
        landType = 'water'
    } else if (i%4 === 0) {
        landType = 'farmland'  
    } else if (i % 3 === 0) {
        landType = 'mountain'
    } else {
        landType = 'field'
    }
    placeholderTerritories.push({
        number: i,
        type: landType
    })
}

const GameBoard = (props) => {

    const {user, gameObject} = props

    const [width, setWidth] = useState(window.innerWidth)
    const [clickedTerritory, setClickedTerritory] = useState('')
    const [updated, setUpdated] = useState(false)

    const setWindowWidth = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', setWindowWidth)

        return function unMount() {
            window.removeEventListener('resize', setWindowWidth)
        }
    }, [updated, gameObject])

    const clickFunction = (e) => {
        setClickedTerritory(e.id)
    }


    let territories = gameObject ? mapTerritories(gameObject.territories, width, clickFunction) : (<h1>Waiting for game board....</h1>)


    return (
        <>
            {territories} 
        </>        
    )
}


export default GameBoard