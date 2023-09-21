import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../../public/firebase/firebase.init";
const Login = () => {
  const [user, setUser] = useState({});
  const auth = getAuth(app);
  console.log(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const LogginInUser = result.user;
        console.log(LogginInUser);
        setUser(LogginInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const LogginInUser = result.user;
        console.log(LogginInUser);
        setUser(LogginInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      {user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <div>
          <button onClick={handleGoogleLogin}>Google Sign In</button>
          <button onClick={handleGithubLogin}>Github Sign In</button>
        </div>
      )}
      {user && (
        <div>
          <h2>Welcome {user.displayName}</h2>
          <p>Your email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
