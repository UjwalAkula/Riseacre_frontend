import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { auth } from '../Thirdparty/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { API_URL } from '../../data/Apipath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { handleshowAuth } from '../../../Redux/AppSlice';

const UserSignUp = () => {
  const dispatch = useDispatch();
  const { showAuth } = useSelector((state) => state.app);

  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userEmail, password);
      const firebaseToken = await userCredential.user.getIdToken();

      const response = await fetch(`${API_URL}/user/user-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          phoneNumber,
          userEmail,
          firebaseUid: userCredential.user.uid,
          idToken: firebaseToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserName('');
        setPhoneNumber('');
        setUserEmail('');
        setPassword('');
        setErrorMessage('');
        dispatch(handleshowAuth(showAuth));
      } else {
        setErrorMessage(data.message || 'An error occurred during registration');
      }
    } catch (error) {
      setErrorMessage('An error occurred during sign-up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10007] flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-sm mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => dispatch(handleshowAuth(showAuth))}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="text-gray-600 text-lg"
          />
        </button>

        {/* Content container with proper mobile padding */}
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold bg-blue-800 text-white px-6 py-2 rounded-lg inline-block">
              RiseAcre.in
            </h2>
            <p className="text-sm sm:text-base text-blue-800 mt-3 font-medium">
              Innovate, Grow, Rise with Riseacre
            </p>
          </div>

          {/* Sign up form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-blue-800 text-sm font-semibold">
                Enter User Name
              </label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full border-0 border-b-2 border-blue-800 bg-transparent outline-none py-3 text-base focus:border-blue-600 transition-colors"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-blue-800 text-sm font-semibold">
                Enter Phone Number
              </label>
              <div className="phone-input-container">
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  required
                  className="w-full border-0 border-b-2 border-blue-800 py-3 text-base focus-within:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-blue-800 text-sm font-semibold">
                Enter Email
              </label>
              <input
                type="email"
                name="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
                className="w-full border-0 border-b-2 border-blue-800 bg-transparent outline-none py-3 text-base focus:border-blue-600 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-blue-800 text-sm font-semibold">
                Enter Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-0 border-b-2 border-blue-800 bg-transparent outline-none py-3 text-base focus:border-blue-600 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white py-3 sm:py-4 rounded-lg font-semibold text-base transition-colors mt-6"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </div>

        {/* Custom styles for PhoneInput to match design */}
        <style jsx>{`
          .phone-input-container .PhoneInputInput {
            border: none !important;
            background: transparent !important;
            outline: none !important;
            font-size: 16px !important;
            padding: 12px 0 !important;
          }
          
          .phone-input-container .PhoneInputCountrySelect {
            border: none !important;
            background: transparent !important;
            outline: none !important;
            font-size: 16px !important;
            padding: 12px 8px 12px 0 !important;
          }
          
          .phone-input-container .PhoneInput {
            border-bottom: 2px solid #1e40af !important;
            background: transparent !important;
          }
          
          .phone-input-container .PhoneInput:focus-within {
            border-bottom-color: #2563eb !important;
          }
          
          @media (max-width: 640px) {
            .phone-input-container .PhoneInputInput {
              font-size: 16px !important;
            }
            .phone-input-container .PhoneInputCountrySelect {
              font-size: 14px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default UserSignUp;