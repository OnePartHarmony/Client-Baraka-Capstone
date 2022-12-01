import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>            
            <div className='signOut mt-5'>                
                <h2 className='mx-auto mb-4'>Are you sure you want to sign out?</h2>                    
                <ButtonGroup className='signOutButtons mx-auto'>
                    <Button variant='danger' onClick={onSignOut}>
                        Sign Out
                    </Button>
                    <Button variant='warning' onClick={onCancel}>
                        Cancel
                    </Button>
                </ButtonGroup>                
            </div>           
		</>
	)
}

export default SignOut
