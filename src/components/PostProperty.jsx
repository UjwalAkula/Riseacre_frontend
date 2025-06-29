import React, { useEffect } from 'react';
import ListingStep_1 from './ListingStep_1';
import ListingStep_2 from './ListingStep_2';
import ListingStep_3 from './ListingStep_3';
import { useSelector, useDispatch } from 'react-redux';
import PropertiesNavBar from './PropertiesNavBar';
import UserActivity from './UserActivity';
import Authentication from './Authentication';
import { handleLoggedIn, handleshowAuth } from '../../Redux/AppSlice';

const PostProperty = () => {
  const dispatch = useDispatch();
  const page_location = { pathname: '/postProperty' };

  const { showUser, showAuth, loggedIn } = useSelector((state) => state.app);
  const showStep_1 = useSelector((state) => state.posting.showStep_1);
  const showStep_2 = useSelector((state) => state.posting.showStep_2);
  const showStep_3 = useSelector((state) => state.posting.showStep_3);

  const isPostPropertyPage = page_location.pathname === '/postProperty';

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(handleLoggedIn(false));
    }
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {!loggedIn && isPostPropertyPage && <Authentication />}
      {showAuth && isPostPropertyPage && <Authentication />}

      {showUser && isPostPropertyPage && (
        <div className="w-full">
          <UserActivity />
        </div>
      )}

      <PropertiesNavBar />

      {/* Simple Header */}
      <div className="text-center py-6 px-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Post Your Property</h1>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 lg:p-8">
            {showStep_1 && <ListingStep_1 />}
            {showStep_2 && <ListingStep_2 />}
            {showStep_3 && <ListingStep_3 />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostProperty;