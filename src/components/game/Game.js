import React, {useCallback, useEffect, useState} from 'react'
import GameBoard from './game-board/GameBoard'
import ActionMenu from './ActionMenu'
import { socket } from '../../apiConfig'


const Game = (props) => {

    const {user, statusArray, setStatusArray, gameObject} = props
    const [clickedTerritory, setClickedTerritory] = useState(null)
    const [playerState, setPlayerState] = useState('wait')
    const [userPlayerObject, setUserPlayerObject] = useState({})
    const [advancingTerritory, setAdvancingTerritory] = useState(null)
    const [territoriesWithConfirmedCommands, setTerritoriesWithConfirmedCommands] = useState([])
    const [width, setWidth] = useState(window.innerWidth)
    
    const setWindowWidth = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', setWindowWidth)

        return function unMount() {
            window.removeEventListener('resize', setWindowWidth)
        }
    }, [])

    
    const adjustHexWidth = useCallback(() => {
        console.log("sup")
        let newWidth = .1 * width
        if (newWidth > 110) {
            newWidth = 110
        } else if (newWidth < 75) {
            newWidth = 75
        }
        return newWidth
    }, [width])

    const [hexWidth, setHexWidth] = useState(adjustHexWidth)

    useEffect(() => {
        setHexWidth(adjustHexWidth)
    }, [width])

    

    //initial placement function
    useEffect(() => {
        if (clickedTerritory && gameObject.placementOrder.length > 0){
            socket.emit('initialUnitPlacement', clickedTerritory._id, userPlayerObject._id, gameObject._id)
            setClickedTerritory(null)
        }
    }, [clickedTerritory])
    

    useEffect(()=> {
        if (gameObject?.command) {
            setPlayerState('selectTerritory')
        }        
    }, [gameObject])

    useEffect(() => {
       if (!statusArray.length && playerState === 'wait') {
            setStatusArray([`Send other players room id: ${user.gameRoomId}`])
        } 
    })



    //check for win and death
    // useEffect(() => {
    //     //find preists
    //     let myPriests = 0
    //     let theirPriests = 0
    //     gameObject?.territories.forEach(territory => {
    //         if (territory.priests) {
    //             if (territory.controlledBy === userPlayerObject._id) {
    //                 myPriests += territory.priests
    //             } else {
    //                 theirPriests += territory.priests
    //             }
    //         }            
    //     })
    //     if (theirPriests && !myPriests){
    //         socket.emit('iDied', user, (response) => {
    //             let newStatArray = statusArray.slice()
    //             newStatArray.unshift(response.message)
    //             setStatusArray(newStatArray)
    //         })
    //     } else if (myPriests && !theirPriests) {
    //         socket.emit('iWon', user)
    //     }

    // }, gameObject)

    useEffect(() => {
        if (playerState === 'selectTerritory' && clickedTerritory) {
            setPlayerState('selectCommand')
        }
    }, [clickedTerritory])

    return (
        <>            
            <div className='game'>            
                <div className='gameLeft' style={{height: 6.5 * hexWidth, width: 7.7 * hexWidth}}>
                    <GameBoard
                        user={user}
                        gameObject={gameObject}
                        clickedTerritory={clickedTerritory}
                        setClickedTerritory={setClickedTerritory}
                        playerState={playerState}
                        setPlayerState={setPlayerState}
                        userPlayerObject={userPlayerObject}
                        setUserPlayerObject={setUserPlayerObject}
                        advancingTerritory={advancingTerritory}
                        territoriesWithConfirmedCommands={territoriesWithConfirmedCommands}
                        hexWidth={hexWidth}
                        setStatusArray={setStatusArray}
                    />
                </div>            
                <ActionMenu
                    user={user}
                    gameObject={gameObject}
                    clickedTerritory={clickedTerritory}
                    setClickedTerritory={setClickedTerritory}
                    playerState={playerState}
                    setPlayerState={setPlayerState}
                    advancingTerritory={advancingTerritory}
                    setAdvancingTerritory={setAdvancingTerritory}
                    setTerritoriesWithConfirmedCommands={setTerritoriesWithConfirmedCommands}
                    userPlayerObject={userPlayerObject}
                />            
            </div>
        </>

    )
}

export default Game
