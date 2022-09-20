import './App.css';
import React, { ReactNode, StrictMode, useEffect } from 'react';
import { Navigate } from 'react-router';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { getMyProfile } from './redux/profile-reducer/profile-reducer';
import { initializeApp, appActions } from './redux/app-reducer/app-reducer';
import { getIsAppInitialized, getIsSidebarHidden } from './redux/app-reducer/app-selector';
import { getIsLoggedIn, getUID } from './redux/auth-reducer/auth-selector';

import Sidebar from './components/Sidebar/Sidebar';
import Loading from './components/common/Loading/Loading';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Alert from './components/Alert/Alert';
import Login from './components/Login/Login';
import Users from './components/Users/Users';
import Messages from './components/Messages/Messages';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import { store } from './redux/redux-store';

const App = () => {
  const isAppInitialized = useSelector(getIsAppInitialized);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isSidebarHidden = useSelector(getIsSidebarHidden);
  const uid = useSelector(getUID);

  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) dispatch(getMyProfile(uid));
  }, [dispatch, uid]);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch, isAppInitialized]);

  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (event?.reason?.substring) {
        if (event.reason.substring(0, 18) === 'Invalid url format')
          dispatch(appActions.setAlert({ message: `Couldn't upload profile data`, type: 'error' }));
        else dispatch(appActions.setAlert({ message: event.reason, type: 'error' }));
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  });

  if (!isAppInitialized) return <Loading />;

  return (
    <div className="w-full h-screen">
      {isLoggedIn && (
        <div className="fixed w-60 mt-12 z-0">
          <Sidebar />
        </div>
      )}

      <div className="fixed w-full z-20 sm:-mt-14 lg:mt-auto">
        <Header />
      </div>

      <div
        className={cn('lg:p-4 h-full z-10', {
          'ml-60': isLoggedIn && !isSidebarHidden,
        })}
      >
        <Alert />
        <div className="mt-14">
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/messages/*" element={<Messages />} />

            <Route path="/login" element={<Login />} />
            <Route path="/login/facebook" element={<div>facebook</div>} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
