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

const GameBoard = ({user}) => {

    const [width, setWidth] = useState(window.innerWidth)
    const [clickedTerritory, setClickedTerritory] = useState(false)

    const setWindowWidth = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', setWindowWidth)

        return () => {
            window.removeEventListener('resize', setWindowWidth)
        }
    }, [])

    const clickFunction = () => {
        // e.preventDefault()
        // setClickedTerritory(e.target.id)
        setClickedTerritory(prev => !prev)
    }

    const territories = mapTerritories(placeholderTerritories, width, clickFunction)

    return (
        <>
            {territories} 
        </>        
    )
}


export default GameBoard