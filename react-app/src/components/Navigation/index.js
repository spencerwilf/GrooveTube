import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { login } from '../../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch()
	const history = useHistory()


	const demoLogin = () => {
		dispatch(login('demo@aa.io', 'password'));
	}

	const loginClick = (e) => {
		e.preventDefault()
		history.push('/login')
	}

	const signupClick = (e) => {
		e.preventDefault()
		history.push('/signup')
	}

	return (
		<div className='nav-bar-wrapper'>
			<div className='logo'>
				<NavLink exact to="/">Logo Placeholder</NavLink>
			</div>
			<div className='search-bar'>
				<input placeholder='Search' type='text'></input>
			</div>
			{!sessionUser && (
				<div>
					<div onClick={loginClick}>Login</div>
					<div onClick={signupClick}>Sign Up</div>
					<div onClick={demoLogin}>Demo Login</div>
				</div>
			)}
			{sessionUser && (
				<div>
					<div className='search-container'>

					</div>
					<ProfileButton user={sessionUser} />
				</div>
			)}

		</div>
	);
}

export default Navigation;