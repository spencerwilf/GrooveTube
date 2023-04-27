import React from 'react'
import './SplashPage.css'
import logo from '../../media/disco-only.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import me from '../../media/me.jpg'
import ball from '../../media/ball.png'

const SplashPage = () => {
    
  return (
    <div className='splash-all-wrapper'>
        <section className='splash-top-section'>
          <div className='splash-page-top-animation'>
            
          </div>
          <div className='splash-logo-and-header'>
          <span className='welcome-to-groovetube'>Welcome to GrooveTube!</span>
          <img className='splash-logo' src={logo}/>
        </div>
        </section>
        <section className='splash-second-section'>
              <a target='_blank' href='https://www.linkedin.com/in/spencer-wilfahrt-1a4604156'>
            <div className='splash-about-me'>
                  <p style={{ color: '#2E64AB' }}>Made with love by...</p>
                
            <img className='me-img' src={me}/>
                  <h5 style={{ color: '#2E64AB'}}>Spencer Wilfahrt</h5>
                  <div className='splash-div-socials'>
                      <a target='_blank' href='https://github.com/spencerwilf'><i id='splash-social-icon' class="fa-brands fa-github"></i></a>
                      <a target='_blank' href='https://www.linkedin.com/in/spencer-wilfahrt-1a4604156'><i id='splash-social-icon' class="fa-brands fa-linkedin"></i></a>
                  </div>
            </div>
              </a>
            <Link to='/'><button className='go-to-app-button'>GO TO THE APP</button></Link>
        </section>
    </div>
  )
}

export default SplashPage