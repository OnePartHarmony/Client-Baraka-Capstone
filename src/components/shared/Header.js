import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import backgroundMusic from '../../audio/EmilyHopkins-SlowCat.mp3'
import Player from './BackgroundMusic'

const linkStyle = {
	color: 'rgb(165, 163, 163)',
	textDecoration: 'none',
	marginLeft: "10px"
}
const authenticatedOptions = (
	<>
		<Nav.Item>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='/change-game' style={linkStyle}>
				Change Game
			</Link>
		</Nav.Item>
		
	</>
)

const unauthenticatedOptions = (
	<>
		<Nav.Item>
			<Link to='sign-up' style={linkStyle}>Sign Up</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='sign-in' style={linkStyle}>Sign In</Link>
		</Nav.Item>
	</>
)

const alwaysOptions = (

	<>
		<Nav.Item>
			<Link to='/rules' style={linkStyle}>
				Rules
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user, joinedGame }) => (
	<Navbar variant='dark' expand='md' className='navigation' style={{ paddingTop: '2px', paddingBottom: '2px' }}>
		<Navbar.Brand>
			<Link to='/' style={linkStyle}>
				<img src='/favicon.ico' alt='baraka logo' className='brandLink' height='40px' />
			</Link>
		</Navbar.Brand>
		<Nav.Item>
			<Player
				url={backgroundMusic}
			/>
		</Nav.Item>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav opacity-1' style={{background: 'rgb(30,33,37)'}}>
			<Nav className='ml-auto'>			
				{user ?
					<>						
						{/* <Nav.Item>
							<Link to='/' style={linkStyle}>
								{user.gameRoomId && joinedGame ?
									<span className='navbar-text mr-2'>Game Id: {user.gameRoomId}</span>
									:
									<span>Game</span>
								}								
							</Link>
						</Nav.Item> */}
						{authenticatedOptions}
					</>
					
				: unauthenticatedOptions}
				{alwaysOptions}
			</Nav>			
		</Navbar.Collapse>
	</Navbar>
)

export default Header
