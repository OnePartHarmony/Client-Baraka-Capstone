import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import { Form, Button } from 'react-bootstrap'

const SignIn = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	const onSignIn = (event) => {
		event.preventDefault()
		const { msgAlert, setUser } = props

        const credentials = {email, password}

		signIn(credentials)
			.then((res) => {
                setUser(res.data.user)
            })
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='authForm'>
            <div className='col-sm-10 col-md-8 mx-auto'>
                <h3>Sign In</h3>
                <Form onSubmit={onSignIn}>
                    <Form.Group controlId='email'>
                        <Form.Label className='mt-3'>Email address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label className='mt-3'>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='danger' type='submit' className='mt-4 newGameButton'>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SignIn
