import React, {useState} from 'react'

const JoinGame = (props) => {

    const {user, msgAlert, setJoinedGame, roomId, setRoomId, joinGame} = props
       
    const handleChange = (e) => {
        setRoomId(e.target.value)
    }

    return (
        <>
            <div className='newGameForm'>                
                <h3>Join an Existing Game</h3>
                <label>Game Key:</label>
                <input type='text' value={roomId} placeholder='Enter the code for your game' onChange={handleChange}/>
                <br/>
                <button className='newGameButton btn btn-dark' onClick={joinGame} style={{margin: 'auto'}}>
                    Join Game
                </button>
            </div>
        </>
    )
}


export default JoinGame