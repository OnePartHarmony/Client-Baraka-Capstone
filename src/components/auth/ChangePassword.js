import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChangePassword = (props) => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate()

	const onChangePassword = (event) => {
		event.preventDefault()

		const { msgAlert, user } = props
        console.log('the user', user)
        

        const passwords = {oldPassword, newPassword}

		changePassword(passwords, user)
			.then(() =>
				msgAlert({
					heading: 'Change Password Success',
					message: messages.changePasswordSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
				setOldPassword('')
                setNewPassword('')
				msgAlert({
					heading: 'Change Password Failed with error: ' + error.message,
					message: messages.changePasswordFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='authForm'>
            <div className='col-sm-10 col-md-8 mx-auto'>
                <h3>Change Password</h3>
                <Form onSubmit={onChangePassword}>
                    <Form.Group controlId='oldPassword'>
                        <Form.Label className='mt-3'>Old password</Form.Label>
                        <Form.Control                            
                            required
                            name='oldPassword'
                            value={oldPassword}
                            type='password'
                            placeholder='Old Password'
                            onChange={e => setOldPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='newPassword'>
                        <Form.Label className='mt-3'>New Password</Form.Label>
                        <Form.Control                            
                            required
                            name='newPassword'
                            value={newPassword}
                            type='password'
                            placeholder='New Password'
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='danger' type='submit' className='mt-3'>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ChangePassword