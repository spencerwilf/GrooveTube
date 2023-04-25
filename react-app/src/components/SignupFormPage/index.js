import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [profile_picture, setProfilePicture] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      let formData = new FormData()
      formData.append('email', email)
      formData.append('first_name', first_name)
      formData.append('last_name', last_name)
      formData.append('profile_picture', profile_picture)
      formData.append('username', username)
      formData.append('password', password)
        const data = await dispatch(signUp(formData));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* <h1>Sign Up</h1> */}
      <div className="outer-login-wrapper">
        <div className="sign-in-box-header">
          <h2 className="sign-in-form-header">Sign Up</h2>
          <p>to continue to GrooveTube</p>
        </div>
      <form className="login-form" onSubmit={handleSubmit}>
          {errors.map((error, idx) => <p className="sign-up-errors" key={idx}>{error}</p>)}
        <div></div>
          <div id="sign-up-input-wrapper" className="login-inputs-container">
            <div className="first-name-last-name-sign-up">
        <label>
          <input
            type="text"
            placeholder="First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
            </div>
        <label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
            <label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <div className="upload-profile-pic-signup">
        <label className="upload-pfp-signup">
                <p className="signup-pfp-upload-header">Profile Picture (optional)</p>
          <input
            type="file"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            accept='image/*'
          />
        </label>
            
          
        <button type="submit">Sign Up</button>
          </div>
          </div>
      </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
