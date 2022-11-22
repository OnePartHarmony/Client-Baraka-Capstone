import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { createGame } from '../api/game'


const NewGame = ({user, msgAlert}) => {

    const startGame = () => {
        createGame(user)
        .then(game => {
            console.log(game)
        })
        .catch(err => {
            msgAlert({
                heading: 'Failed to create game',
                message: err,
                variant: 'danger'
            })
        })
    }

    return (
        <>
            <div className='newGameForm'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h3>Create a New Game</h3>
                    <Form onSubmit={startGame}>
                        <Button variant='primary' type='submit'>
                            Create Game
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}


export default NewGame