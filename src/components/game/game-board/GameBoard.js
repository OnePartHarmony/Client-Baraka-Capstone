import React, {useEffect, useState} from 'react'
import HexMap from './HexMap'


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

    const {user, gameObject, clickedTerritory, setClickedTerritory} = props

    const [width, setWidth] = useState(window.innerWidth)
    const [userPlayerObject, setUserPlayerObject] = useState({})
    const [clickableBoard, setClickableBoard] = useState(false)

    useEffect(() => {
            window.addEventListener('resize', setWindowWidth)

            return function unMount() {
                window.removeEventListener('resize', setWindowWidth)
            }
        }, [])


    useEffect(() => {
        //find the player object that belongs to the user
        if (gameObject) {
            gameObject.players.forEach(player => {
                if (player.user._id === user._id) {
                    setUserPlayerObject(player)
                }
            })
        }        
        
        if (gameObject && userPlayerObject &&((gameObject.command) || gameObject.placementOrder[0] === userPlayerObject.season)) {
            setClickableBoard(true)
        } else {
            setClickableBoard(false)
        }

    }, [gameObject])

    const setWindowWidth = () => {
        setWidth(window.innerWidth)
    }

    


    let territories = gameObject ? 
        <HexMap
                territories={gameObject.territories}
                width={width}
                setClickedTerritory={setClickedTerritory}
                clickableBoard={clickableBoard}
                userPlayerObject={userPlayerObject}
                gameObject={gameObject}
        /> 
        : 
        (<h1>Waiting for game board....</h1>)


    return (
        <>
            {territories}
        </>        
    )
}


export default GameBoard