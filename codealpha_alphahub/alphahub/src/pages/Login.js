import React from "react";
import { auth, provider } from "../firebase"; 
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/"); 
      })
      .catch((error) => {
        console.log("Login Error:", error);
      });
  };

  return (
    <div className="loginPage">
      <div className="login-card">
        <h2 className="login-title">Welcome to Alphahub</h2>
        <p className="login-subtitle">Sign In With Google to post your updates</p>
        
        <button 
          className="login-with-google-btn" 
          onClick={signInWithGoogle}
        >
          {}
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;