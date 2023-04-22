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



	const loginClick = (e) => {
		e.preventDefault()
		history.push('/login')
	}



	return (
		<div className='nav-bar-wrapper'>
			<div className='logo'>
				<NavLink exact to="/">Logo Placeholder</NavLink>
			</div>
			{!sessionUser && (
				<div>
					<button onClick={loginClick} className='logged-out-sign-in-button'>
					<i className="fas fa-user-circle" />
						Sign in
					</button>
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
