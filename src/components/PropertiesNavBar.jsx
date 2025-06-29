import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleShowUser } from '../../Redux/AppSlice';

const PropertiesNavBar = () => {
  const dispatch = useDispatch();
  const { showUser, showPostPropertyBtn } = useSelector((state) => state.app);
  const location = useLocation();
  const isPostPropertyPage = location.pathname === '/postProperty';

  return (
    <div className="w-full h-16 sm:h-18 md:h-20 px-3 sm:px-4 md:px-8 flex items-center justify-between bg-blue-600 fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="text-white text-2xl sm:text-xl md:text-2xl lg:text-3xl font-medium font-ubuntu">
        Riseacre<span className="text-xs sm:text-sm md:text-base lg:text-xl">.in</span>
      </div>
      
      {/* Right side buttons */}
      <div className="flex items-center gap-3 sm:gap-3 md:gap-4 lg:gap-6">
        {/* Post Property Button - Only show if not on post property page */}
        {!isPostPropertyPage && (
          <Link 
            to={'/postProperty'} 
            className="text-primary no-underline" 
            style={{ textDecoration: 'none' }}
          >
            <div className="flex items-center justify-center gap-1 sm:gap-2 h-8 sm:h-9 md:h-10 lg:h-12 px-2 sm:px-3 md:px-4 bg-white text-blue-600 rounded border border-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-100">
              <span className="font-bold">Post property</span>
              <div className="text-green-600 border border-green-600 px-1 text-[10px] sm:text-xs font-bold rounded whitespace-nowrap">
                FREE
              </div>
            </div>
          </Link>
        )}
        
        {/* User Profile Button */}
        <div
          className="border border-white rounded-full p-1.5 sm:p-2 bg-white h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-100"
          onClick={() => dispatch(handleShowUser(showUser))}
        >
          <FontAwesomeIcon 
            icon={faUser} 
            className="text-blue-600 text-xs sm:text-sm md:text-base" 
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesNavBar;