import React, {useState} from 'react'
import './SplashPage.css'
import logo from '../../media/GrooveTube.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import me from '../../media/me.jpg'
import ball from '../../media/discoball.png'
import September from '../../media/September2.mp3'
import discoBackground from '../../media/pexels-pixabay-855645-1920x1080-24fps.mp4'
import smiley from '../../media/smiley.png'
import heart from '../../media/heart.png'
import groovy from '../../media/groovy.png'
import skull from '../../media/skull.png'
// import postgres from "../../media/postgres.png";
// import react from "../../media/react.png";
// import redux from "../../media/redux.png";
// import flask from "../../media/flask.png";
// import sqlalchemy from "../../media/sqlalchemy.png";
// import python from "../../media/python.png";
// import js from "../../media/js.png";
// import css from "../../media/css.png";
// import html from "../../media/html.png";

const SplashPage = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [termsClicked, setTermsClicked] = useState(true)

    const togglePlay = () => {
        const audio = document.getElementById('audio');
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
            window.scrollTo(0, 0);
        }
        setIsPlaying(!isPlaying);
    };


    const handleTermsClicked = () => {
        setTermsClicked(!termsClicked)
    }

  return (
    <div className='splash-all-wrapper'>
          <button className='audio-play-button' onClick={togglePlay}>{isPlaying ? "Stop the party!" : 'Party Button'}</button>
          <audio id="audio" src={September}/>
        <section className='splash-top-section'>
              <Link to='/home'><span className='header-logo-splash-span'><img className='header-nav-logo-render' src={logo} /></span></Link>
          <div className={isPlaying ? 'splash-page-top-animation party' : 'splash-page-top-animation regular'}>
            {!isPlaying && (
                <div className='main-top-img-section'>
                    <div className='indiv-img-top-sec'>
                    <img className='main-top-img' src={smiley}/>
                    <img className='main-top-img' src={heart} />
                    </div>

                    <div className='indiv-img-top-sec'>
                        <img className='inactive-party-ball' src={ball} />
                    </div>

                    <div className='indiv-img-top-sec'>
                    <img className='main-top-img' src={groovy} /> 
                    <img className='main-top-img' src={skull} />  
                    </div>

                </div>
            )}
          </div>

              <Link to='/home'><button className='go-to-app-button'>Take me to the app!</button></Link>


        </section>
          <section className='splash-second-section-2'>
              <video id='video-background-splash' autoPlay muted loop>
                  <source src={discoBackground}></source>
              </video>
              <div className='second-section-groovetube-header'>
                {termsClicked ? (
                    <>
                    <h1 style={{marginBottom: '5px', marginTop: '0'}}>So what's GrooveTube?</h1>
                    <p>GrooveTube is a full-stack video-sharing application inspired by YouTube. However, unlike YouTube, our terms specify that strictly the funkiest, most groove-inducing disco is allowed on our platform (read our terms and conditions below). So grab your dancing shoes, throw on the bell-bottoms and show the world what those hips can do! </p>
                          <button className='second-section-button one' onClick={handleTermsClicked}>Read our terms and conditions</button>
                      </>
                ) : <div>
                    <h2>Terms and Conditions</h2>
                    <p>Welcome to GrooveTube. These terms and conditions outline the rules and regulations for the use of the application.</p>
                    <p>By accessing GrooveTube, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you may not use the application.</p>
                    <p>First article: </p>
                    <h1 style={{fontWeight:'bold'}}>ONLY DISCO ALLOWED.</h1>
                    <button className='second-section-button two' onClick={handleTermsClicked}>Go back</button>
                    </div>}
              </div>
              <a target='_blank' href='https://www.linkedin.com/in/spencer-wilfahrt-1a4604156'>
                  <div className='splash-about-me'>
                      <p style={{ color: 'white' }}>Made with love by...</p>

                      <img className='me-img' src={me} />
                      <h5 style={{ color: 'white' }}>Spencer Wilfahrt</h5>
                      <div className='splash-div-socials'>
                          <a target='_blank' href='https://github.com/spencerwilf'><i id='splash-social-icon' class="fa-brands fa-github"></i></a>
                          <a target='_blank' href='https://www.linkedin.com/in/spencer-wilfahrt-1a4604156'><i id='splash-social-icon' class="fa-brands fa-linkedin"></i></a>
                      </div>
                  </div>
              </a>
              {/* <div className="carousel-container">
                  <div className="carousel-slides">
                      <div className="carousel-slide">
                          <img
                              className="carousel-image"
                              src={postgres}
                              alt="coding language"
                          />
                      </div>
                      <div className="carousel-slide">
                          <img
                              className="carousel-image"
                              src={react}
                              alt="coding language"
                          />
                      </div>
                      <div className="carousel-slide">
                          <img
                              className="carousel-image"
                              src={redux}
                              alt="coding language"
                          />
                      </div>
                      <div className="carousel-slide">
                          <img
                              className="carousel-image"
                              src={flask}
                              alt="coding language"
                          />
                      </div>
                      <div className="carousel-slide">
                          <img
                              className="carousel-image"
                              src={sqlalchemy}
                              alt="coding language"
                          />
                      </div>
                      <div className="carousel-slide">
                          <img
                              className="carousel-image"
                              src={python}
                              alt="coding language"
                          />
                      </div>
                      <div className="carousel-slide">
                          <img
                              className="carousel-image"
                              src={js}
                              alt="coding language"
                          />
                      </div>
                      <div className="carousel-slide">
                          <img
                              className="carousel-image"
                              src={css}
                              alt="coding language"
                          />
                      </div>
                      <div className="carousel-slide">
                          <img
                              className="carousel-image"
                              src={html}
                              alt="coding language"
                          />
                      </div>

                  </div> */}

              {/* </div> */}

          </section>
        {/* <section className='splash-second-section'>
             
            
        </section> */}
    </div>
  )
}

export default SplashPage