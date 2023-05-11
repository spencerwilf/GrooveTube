import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './SideBar.css'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

const SideBar = () => {
    const sessionUser = useSelector(state => state.session.user)
    const location = useLocation()

  return (
      <div className='home-side-bar-socials'>
        <div className='home-and-signin-or-videos'>

              <div className={location.pathname === '/home' ? 'home-sidebar-tab main' : 'home-sidebar-tab videos'}>

              <Link to='/home'>
                <div style={{display:'flex', alignItems:'center',gap:'10px', fontSize:'18px', padding:'.8rem'}}>
                <i class="fa-solid fa-house"></i>
                <p style={{margin:'0'}}>Home</p>
                </div>
                </Link>
              </div>
        
          {sessionUser ? 
              <p className='user-videos-link'><Link className='target-your-videos' to={`/users/${sessionUser?.id}`}>
                <i class="fa-solid fa-film"></i>
                Your videos</Link>
                </p> 
                  : <Link to={`/login`}><p className='sidebar-sign-in-p'><i class="fa-solid fa-user"></i>Sign in</p></Link>}
          </div>
          <div>
              <p>Socials</p>
              <div className='github-icon-wrapper'>
                  <a className='github-a-tag' href='https://github.com/spencerwilf' target='_blank'>
                      <i id='github-logo' className="fa-brands fa-github" />
                      <p className='home-social-media-icons'>Github</p>
                  </a>
              </div>
              <div className='github-icon-wrapper'>
                  <a className='github-a-tag' href='https://www.linkedin.com/in/spencer-wilfahrt-1a4604156/' target='_blank'>
                      <i id='github-logo' className="fa-brands fa-linkedin"></i>
                      <p className='home-social-media-icons'>LinkedIn</p>
                  </a>
              </div>
          </div>
      </div>
  )
}

export default SideBar