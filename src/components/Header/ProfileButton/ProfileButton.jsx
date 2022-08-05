import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  getIsLoggedIn,
  getLogin,
  getUID,
} from '../../../redux/auth-selector';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/auth-reducer';
import cn from 'classnames';
import { getProfile } from '../../../redux/profile-reducer';
import { getMyData } from '../../../redux/profile-selector';
import placeholder from '../../../assets/pfps/placeholder.jpg';

const ProfileButton = () => {
  const dispatch = useDispatch();
  const [showProfileData, setShowProfileData] = useState(false);

  const isLoggedIn = useSelector(getIsLoggedIn);
  const login = useSelector(getLogin);
  const uid = useSelector(getUID);
  const myData = useSelector(getMyData);

  const profileDataRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDataRef.current &&
        !profileDataRef.current.contains(event.target) &&
        showProfileData
      ) {
        setShowProfileData(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDataRef, showProfileData, setShowProfileData]);

  useEffect(() => {
    dispatch(getProfile(uid));
  }, [dispatch, uid]);

  if (!myData) return null;

  const handleLogout = () => {
    setShowProfileData(false);
    dispatch(logout());
  };

  return (
    <div className="flex flex-col">
      {isLoggedIn ? (
        <>
          <button
            onClick={() => setShowProfileData(!showProfileData)}
            className="rounded-full"
          >
            <img
              src={myData.photos.small || placeholder}
              alt="pfp"
              className="rounded-full w-12 h-12 p-0.5
              transition-colors hover:bg-gray-700 active:bg-gray-800"
            />
          </button>

          <div
            className={cn(
              `fixed right-2 top-16
                flex flex-col
                bg-gray-200 p-8
                border-x border-b border-gray-400
                rounded-b-lg
                font-semibold 
                transition-opacity`,
              { 'opacity-0': !showProfileData },
              { 'opacity-100': showProfileData },
            )}
            ref={profileDataRef}
          >
            <div className="font-semibold text-gray-700">{login}</div>

            <button
              onClick={handleLogout}
              className="font-semibold
            bg-rose-500 hover:bg-rose-600 active:bg-rose-700
            py-0.5 px-4 mt-2
            text-gray-100 text-center
            rounded
            transition-colors cursor-pointer"
            >
              Log out
            </button>
          </div>
        </>
      ) : (
        <NavLink
          to={'/login'}
          className="font-semibold
            bg-gray-500 hover:bg-gray-600 active:bg-gray-700
            py-1 px-4 text-gray-100 text-center
            rounded
            transition-colors cursor-pointer"
        >
          Log in
        </NavLink>
      )}
    </div>
  );
};

export default ProfileButton;
