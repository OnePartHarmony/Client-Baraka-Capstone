import React, {useEffect, useState} from 'react'
import mapTerritories from './territories'

const placeholderTerritories = []
for (let i=0; i<37; i++){
    let landType
    if (i%5 === 0) {
        landType = 'mountain'
    } else if (i%4 === 0) {
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

    const [width, setWidth] = useState(window.innerWidth)
    const [clickedTerritory, setClickedTerritory] = useState(false)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })

        return () => {
            window.removeEventListener('resize', () => {
                setWidth(window.innerWidth)
            })
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