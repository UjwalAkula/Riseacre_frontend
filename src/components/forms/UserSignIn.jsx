import React, { useState } from 'react';
import { auth } from '../Thirdparty/Firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { API_URL } from '../../data/Apipath'; // Make sure to set your backend API URL here

const UserSignIn = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to show during API call
  const [errorMessage, setErrorMessage] = useState(''); // Error message to display if any

  // Handles email/password sign in
  const handlesignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Reset error message

    try {
      // Sign in with Firebase using email and password
      const userCredentials = await signInWithEmailAndPassword(auth, userEmail, password);
      console.log('User signed in:', userCredentials.user);

      // Get the Firebase ID token
      const idToken = await userCredentials.user.getIdToken();
      console.log('ID Token:', idToken);

      // Send the ID token to your backend for verification
      const response = await fetch(`${API_URL}/user/google-signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }) // Send the idToken to your backend
      });

      const data = await response.json();
      if (response.ok) {
        setUserEmail('');
        setPassword('');
        // Successfully authenticated, handle the response (store user, redirect, etc.)
        console.log('Backend Response:', data);
        localStorage.setItem('userToken', JSON.stringify(data.token)); // Store user in localStorage
      } else {
        // Handle backend error (e.g., token verification failure)
        setErrorMessage(data.message || 'Failed to sign in');
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage('Error signing in, please try again');
    } finally {
      setLoading(false);
    }
  };

  // Handles Google sign-in via Firebase
  const handlesigninwithgoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setErrorMessage(''); // Reset error message

    try {
      // Sign in with Google
      const userCredentials = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', userCredentials.user);

      // Get the Firebase ID token
      const idToken = await userCredentials.user.getIdToken();
      console.log('ID Token:', idToken);

      // Send the ID token to your backend for verification
      const response = await fetch(`${API_URL}/user/google-signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }) // Send the idToken to your backend
      });

      const data = await response.json();
      if (response.ok) {
        // Successfully authenticated, handle the response (store user, redirect, etc.)
        console.log('Backend Response:', data);
        localStorage.setItem('userToken', JSON.stringify(data.token)); // Store user in localStorage
      } else {
        // Handle backend error (e.g., token verification failure)
        setErrorMessage(data.message || 'Failed to sign in');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setErrorMessage('Error signing in with Google, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-section">
      <div className="signin-box">
        <div className="signin-header">
          <h2>RiseAcre.in</h2>
        </div>
        <p>Innovate, Grow, Rise with Riseacre</p>

        {/* Email/password form */}
        <form className="signin-form" onSubmit={handlesignin}>
          <div className="userName sin-attri">
            <label><b>Enter Email</b></label>
            <br />
            <input
              type="text"
              name="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>

          <div className="password sin-attri">
            <label><b>Enter Password</b></label>
            <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="submit-button">
            <button type="submit" disabled={loading}>
              <b>{loading ? 'Signing In...' : 'SignIn'}</b>
            </button>
          </div>
        </form>

        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Show error message */}

        <span>________ <sub>or</sub>_________</span>

        {/* Google Sign-In Button */}
        <button onClick={handlesigninwithgoogle} className="google-login-btn" disabled={loading}>
          <FontAwesomeIcon icon={faGoogle} size="lg" style={{ color: "white" }} className='gicon' />
          {loading ? 'Signing In...' : 'SignIn with Google'}
        </button>
      </div>
    </div>
  );
};

export default UserSignIn;
