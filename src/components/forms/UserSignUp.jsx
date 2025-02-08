import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { auth } from '../Thirdparty/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { API_URL } from '../../data/Apipath';

const UserSignUp = () => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to show during API call
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    try {
      // Firebase user creation
      const userCredential = await createUserWithEmailAndPassword(auth, userEmail, password);
      console.log('User signed up:', userCredential.user);

      // Get Firebase ID Token (JWT)
      const firebaseToken = await userCredential.user.getIdToken();

      // Call backend to register user
      const response = await fetch(`${API_URL}/user/user-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          phoneNumber,
          userEmail,
          firebaseUid: userCredential.user.uid,
          idToken: firebaseToken, // Send the Firebase ID token to your backend
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear form on success
        setUserName('');
        setPhoneNumber('');
        setUserEmail('');
        setPassword('');
        setErrorMessage('');
        console.log('User registered:', data);
      } else {
        // Show error message from backend
        setErrorMessage(data.message || 'An error occurred during registration');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('An error occurred during sign-up');
    }finally{
      setLoading(false);
    }
  };
  
  return (
    <div className="signup-section">
      <div className="signup-box">
        <div className="signup-header">
          <h2>RiseAcre.in</h2>
        </div>
        <p>Innovate, Grow, Rise with Riseacre</p>
        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="userName sup-attri">
            <label><b>Enter User Name</b></label>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="phoneNumber sup-attri">
            <label><b>Enter Phone Number</b></label>
            <PhoneInput
              international
              defaultCountry="IN"
              value={phoneNumber}
              onChange={setPhoneNumber}
              className="no-flag-phone-input"
            />
          </div>

          <div className="userEmail sup-attri">
            <label><b>Enter Email</b></label>
            <input
              type="text"
              name="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>

          <div className="password sup-attri">
            <label><b>Enter Password</b></label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="submit-button">
            <button type="submit"><b>{loading ? 'Signing Up...' : 'SignUP'}</b></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignUp;
