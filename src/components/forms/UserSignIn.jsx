import React, { useState } from 'react';
import { auth } from '../Thirdparty/Firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../data/Apipath';
import { useDispatch, useSelector } from 'react-redux';
import { handleshowAuth, handleShowSignUp, handleLoggedIn } from '../../../Redux/AppSlice';

const UserSignIn = () => {
  const dispatch = useDispatch();
  const { showAuth, showSignUp } = useSelector((state) => state.app);

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlesignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, userEmail, password);
      const idToken = await userCredentials.user.getIdToken();

      const response = await fetch(`${API_URL}/user/google-signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userToken', JSON.stringify(data.token));
        dispatch(handleLoggedIn(false));
        dispatch(handleshowAuth(true));
        setUserEmail('');
        setPassword('');
      } else {
        setErrorMessage(data.message || 'Failed to sign in');
      }
    } catch (error) {
      setErrorMessage('Error signing in, please try again');
    } finally {
      setLoading(false);
    }
  };

  const handlesigninwithgoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setErrorMessage('');
    try {
      const userCredentials = await signInWithPopup(auth, provider);
      const idToken = await userCredentials.user.getIdToken();

      const response = await fetch(`${API_URL}/user/google-signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userToken', JSON.stringify(data.token));
        dispatch(handleLoggedIn(false));
        dispatch(handleshowAuth(true));
      } else {
        setErrorMessage(data.message || 'Failed to sign in');
      }
    } catch (error) {
      setErrorMessage('Error signing in with Google, please try again');
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

          {/* Sign in form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-blue-800 text-sm font-semibold">
                Enter Email
              </label>
              <input
                type="email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-0 border-b-2 border-blue-800 bg-transparent outline-none py-3 text-base focus:border-blue-600 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handlesignin}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white py-3 sm:py-4 rounded-lg font-semibold text-base transition-colors"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4 text-sm">
              {errorMessage}
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google sign in */}
          <button
            onClick={handlesigninwithgoogle}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 sm:py-4 rounded-lg font-semibold text-base transition-colors flex items-center justify-center relative"
          >
            <FontAwesomeIcon 
              icon={faGoogle} 
              className="absolute left-4 text-white text-lg" 
            />
            {loading ? 'Signing In...' : 'Sign In with Google'}
          </button>

          {/* Sign up link */}
          <div className="text-center mt-6 text-sm sm:text-base">
            <span className="text-gray-600">New to Riseacre? </span>
            <button
              onClick={() => dispatch(handleShowSignUp(showSignUp))}
              className="text-blue-700 hover:text-blue-800 font-semibold underline transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignIn;