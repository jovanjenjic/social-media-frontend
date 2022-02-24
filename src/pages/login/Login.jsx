import './login.css';
import { useRef } from 'react';
import { useContext } from 'react';
import { loginCall } from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext';
import { CircularProgress} from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const {user, isFetching, error, dispatch} = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({email: email.current.value, password: password.current.value}, dispatch);
  }

  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">Connect with friends and the world araound you on Lamasocial</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input required placeholder='Email' type="email" className="loginInput" ref={email}/>
            <input minLength={6} required placeholder='Password' type='password' className="loginInput" ref={password}/>
            <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px" /> : "Log in"}</button>
            <span className="loginForgot">Forgot Password</span>
            <button className="loginRegisterButton">{isFetching ? <CircularProgress color="white" size="20px" /> : "Create a New Account"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}