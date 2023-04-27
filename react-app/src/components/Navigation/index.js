import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { login } from '../../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from '../OpenModalButton';
import UploadModal from '../UserPage/UploadModal';
import logo from '../../media/GrooveTube.png'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';



function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch()
	const history = useHistory()
	const location = useLocation()

	const modalClick = (e) => {
		// e.preventDefault()
		history.push(`/users/${sessionUser.id}`)
    const modalButton = document.getElementById('modal-open-user-button');
    if (modalButton) {
      modalButton.click();
    }
	}

	const loginClick = (e) => {
		e.preventDefault()
		history.push('/login')
	}



	return (
		<div className='nav-bar-wrapper'>
			{/* <div className='logo'> */}
				<NavLink exact to="/">{<img className='logo' src={logo} alt=''/>}</NavLink>
			{/* </div> */}
			{!sessionUser && location?.pathname !== '/login' && location?.pathname !== '/signup' && (
				<div>
					<button onClick={loginClick} className='logged-out-sign-in-button'>
					<i className="fas fa-user-circle" />
						Sign in
					</button>
				</div>
			)}
			{sessionUser && (
				<div className='signed-in-nav-profile-and-create'>

						<button onClick={modalClick} id='create-video-nav-button' className='create-video-nav-button'>
						<i class="fa-solid fa-video"></i>
						CREATE
						</button>
					<ProfileButton user={sessionUser} />
				</div>
			)}

		</div>
	);
}

export default Navigation;
