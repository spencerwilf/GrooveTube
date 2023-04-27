import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const signupClick = (e) => {
		e.preventDefault()
		history.push('/signup')
	}


  const demoLogin = () => {
		dispatch(login('demo@aa.io', 'password'));
	}


  return (
    <div className="login-page-wrapper">
      <div className="outer-login-wrapper">
        <div className="sign-in-box-header">
      <h2 className="sign-in-form-header">Sign In</h2>
      <p>to continue to GrooveTube</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>

        <div className="login-inputs-container">
          <div className="email-and-password-login-input">
        <label>
                {<p className="login-error" >{errors[0]}</p>}
          <input
            type="text"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
              
        <label>
                {<p className="login-error" >{errors[1]}</p>}
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
              
        </div>
        <button className="demo-login-form-button" onClick={demoLogin}>Demo Login</button>
        <div className="login-form-button-wrapper">
        <div className="login-form-create-account" onClick={signupClick}>Create account</div>
        <button type="submit">Log In</button>
        </div>
        </div>
      </form>
      </div>
      </div>
  );
}

export default LoginFormPage;
