import React, { useState, useRef } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';  // Styles for the input component
import { API_URL } from "../../data/Apipath.js";
import { auth } from '../Thirdparty/Firebase';
import firebase from 'firebase/compat/app';
import { RecaptchaVerifier } from "firebase/auth"; // Import RecaptchaVerifier

const UserLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [error, setError] = useState('');
  const recaptchaRef = useRef(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure both OTP and verificationId are available
    if (!otp || !verificationId) {
      setError("Please enter OTP and complete the verification.");
      return;
    }

    try {
      // Send OTP and verificationId to backend for further processing
      const response = await fetch(`${API_URL}/user/user-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp, verificationId }),
      });

      const data = await response.json();  // Await the response JSON

      if (response.ok) {
        setPhoneNumber('');
        setOtp('');
        setError('');
        console.log('User logged in successfully:', data);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  // Handle send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      setError("Please enter a phone number.");
      return;
    }

    // Initialize reCAPTCHA
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      recaptchaRef.current,
      {
        size: "invisible", // Invisible reCAPTCHA
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
      }
    );

    // Verify phone number and send OTP
    try {
      const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
      setError(""); // Clear any previous errors
      console.log("OTP sent successfully.");
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
      console.error("Error sending OTP: ", error);
    }
  };

  return (
    <>
      <div className="LoginSection">
        <div className="LoginBox">
          <div className="title">
            <h2>RiseAcre.in</h2>
          </div>
          <p>Innovate, Grow, Rise with Riseacre</p>
          <form onSubmit={handleSubmit}>
            <div className="phoneNumbersection">
              <label><b>Enter Phone Number</b></label>
              <br />
              {/* Use react-phone-number-input */}
              <PhoneInput
                international
                defaultCountry="IN"  // Set default country to India
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="no-flag-phone-input"
              />
            </div>

            {/* Send OTP Button */}
            <span className="sendotpbtn" onClick={handleSendOtp}><b>Send OTP</b></span>

            <div className="otpsection">
              <label><b>Enter OTP</b></label>
              <br />
              <input
                type="tel"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)} // Update state when input changes
              />
            </div>

            {error && <p className="error">{error}</p>} {/* Display error messages */}

            <div className="submitbutton">
              <button type="submit" className="submitbtn"><b>Submit</b></button>
            </div>
          </form>

          {/* Invisible reCAPTCHA container */}
          <div id="recaptcha-container" ref={recaptchaRef}></div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;


