import React, {useState} from 'react'
import './SplashPage.css'
import logo from '../../media/GrooveTube.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import me from '../../media/me.jpg'
import ball from '../../media/discoball.png'
import September from '../../media/September2.mp3'

const SplashPage = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        const audio = document.getElementById('audio');
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

  return (
    <div className='splash-all-wrapper'>
          <button className='audio-play-button' onClick={togglePlay}>{isPlaying ? "Stop the party!" : 'Party Button'}</button>
          <audio id="audio" src={September}/>
        <section className='splash-top-section'>
              <Link to='/'><span className='header-logo-splash-span'><img className='header-nav-logo-render' src={logo} /></span></Link>
          <div className={isPlaying ? 'splash-page-top-animation party' : 'splash-page-top-animation regular'}>
            {!isPlaying && <img className='inactive-party-ball' src={ball}/>}
          </div>

              <Link to='/'><button className='go-to-app-button'>Take me to the app!</button></Link>

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
            
        </section>
    </div>
  )
}

export default SplashPage