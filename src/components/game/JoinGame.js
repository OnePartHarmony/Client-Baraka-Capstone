import React from 'react'

const JoinGame = (props) => {

    const {roomId, setRoomId, joinGame} = props
       
    const handleChange = (e) => {
        setRoomId(e.target.value)
    }

    return (
        <>
            <div className='newGameForm'>                
                <h3 className='mb-4'>Join an Existing Game</h3>
                <label>Game Key:</label>
                <br/>
                <input type='text' value={roomId} placeholder='enter game key' onChange={handleChange}/>
                <br/>
                <button className='newGameButton btn btn-dark mt-2' onClick={joinGame} style={{margin: 'auto'}}>
                    Join Game
                </button>
            </div>
        </>
    )
}


export default JoinGame