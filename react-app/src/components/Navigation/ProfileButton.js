import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    history.push('/')
    dispatch(logout());
  };


  const handleProfileClick = (e) => {
    e.preventDefault()
    history.push(`/users/${user.id}`)
    setShowMenu(false)
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>

        <img id="user-nav-pfp" onClick={openMenu} className="video-page-comment-user-picture" src={user?.profile_picture} alt=''/>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="dropdown-top-section">
            
              <img className="video-page-comment-user-picture" src={user?.profile_picture} alt=''/>
           
              <div className="dropdown-name-and-pfp"><div>{`${user.first_name} ${user.last_name}`}</div>
                <div>@{user.username}</div>
              </div>
            </div>
              <div className="my-channel-dropdown-text" onClick={handleProfileClick}>My Channel</div>
            
            <div>
              <button id="dropdown-menu-logout-button" onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
