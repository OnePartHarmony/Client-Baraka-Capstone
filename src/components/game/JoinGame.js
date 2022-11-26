import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import { socket } from '../../apiConfig'

const JoinGame = ({user, msgAlert, setJoinedGame}) => {

    const [roomId, setRoomId] = useState('')

    const handleChange = (e) => {
        setRoomId(e.target.value)
    }

    const joinGame = (e) => {
        e.preventDefault()
        socket.emit('joinGame', roomId, (response) => {
            setJoinedGame(true)
            console.log("joined?",response.message)
        })

        //create player document 
    }

    return (
        <>
            <div className='newGameForm'>                
                <h3>Join an Existing Game</h3>                
                {/* <button className='newGameButton btn btn-dark' onClick={joinGame} style={{margin: 'auto'}}>
                    Join Game
                </button> */}
                <Form onSubmit={joinGame} >
                    <Form.Group>
                        <Form.Label>Game Key:</Form.Label>
                        <Form.Control
                            type='text'
                            value={roomId}
                            placeholder='Enter the code for your game'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <button type='submit'  className='newGameButton btn btn-dark mt-3'>Join Game</button>
                </Form>
            </div>
        </>
    )
}


export default JoinGame