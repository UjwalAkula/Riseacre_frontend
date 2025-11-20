import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/Apipath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faHeart,
  faHouseLaptop,
  faArrowRightToBracket,
  faCircleLeft,
  faXmark,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleShowUser,
  handleshowAuth,
  handleSignOut,
} from '../../Redux/AppSlice';

const UserActivity = () => {
  const dispatch = useDispatch();
  const { showUser, showAuth, loggedIn } = useSelector((state) => state.app);

  const [user, setUser] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await fetch(`${API_URL}/user/get-user/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUser(data.user.userName);
        setPhoneNumber(data.user.phoneNumber);
        setEmail(data.user.userEmail);
      } else {
        console.error('Error fetching user info');
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[100] md:hidden"
        onClick={() => dispatch(handleShowUser(showUser))}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-screen w-full sm:w-80 md:w-96 lg:w-[400px] z-[101] bg-gradient-to-b from-blue-50 to-white shadow-2xl overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-blue-100">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-700 font-ubuntu">
                Riseacre
              </h2>
            </div>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
              onClick={() => dispatch(handleShowUser(showUser))}
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
          </div>

          {/* User Info Card - Always show when user data exists */}
          {(user || phoneNumber || email) && (
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {loggedIn ? 'Welcome back!' : 'User Profile'}
                  </h3>
                  <p className="text-gray-500 text-sm">{user || 'User'}</p>
                </div>
              </div>
              <div className="space-y-3">
                {phoneNumber && (
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 text-sm font-medium min-w-[60px]">Phone:</span>
                    <span className="text-gray-800 text-sm">{phoneNumber}</span>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 text-sm font-medium min-w-[60px]">Email:</span>
                    <span className="text-gray-800 text-sm break-all">{email}</span>
                  </div>
                )}
                {user && (
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 text-sm font-medium min-w-[60px]">Name:</span>
                    <span className="text-gray-800 text-sm">{user}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Activity Section */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-blue-100">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              My Activity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="group p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-blue-600 text-lg"
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">
                    Contacted<br />Properties
                  </p>
                  <p className="text-lg font-bold text-blue-600 mt-1">0</p>
                </div>
              </div>
              
              <div className="group p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-200 transition-colors">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-red-500 text-lg"
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">
                    Saved<br />Properties
                  </p>
                  <p className="text-lg font-bold text-red-500 mt-1">0</p>
                </div>
              </div>
              
              <div className="group p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                    <FontAwesomeIcon
                      icon={faHouseLaptop}
                      className="text-green-600 text-lg"
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">
                    Listed<br />Properties
                  </p>
                  <p className="text-lg font-bold text-green-600 mt-1">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 mb-6 border border-purple-200">
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-2">More Features Coming Soon!</h4>
              <p className="text-gray-600 text-sm">
                We're working on exciting new features to enhance your property experience.
              </p>
            </div>
          </div>

          {/* Login / Logout Button */}
          {!loggedIn ? (
            <button
              className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02]"
              onClick={() => dispatch(handleshowAuth(showAuth))}
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} className="text-lg" />
              <span className="font-semibold">Sign In to Continue</span>
            </button>
          ) : (
            <button
              className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-[1.02]"
              onClick={() => {
                const result = window.confirm("Are you sure you want to sign out?");
                if (result) {
                  dispatch(handleSignOut());
                  window.location.href = "/";
                }
              }}
            >
              <FontAwesomeIcon icon={faCircleLeft} className="text-lg" />
              <span className="font-semibold">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserActivity;