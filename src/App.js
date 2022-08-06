import './App.css';
import React, { StrictMode, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import LoadingPage from './components/common/Loading/LoadingPage';
import store from './redux/redux-store';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Error from './components/Error/Error';
import { getIsLoggedIn } from './redux/auth-selector';
import cn from 'classnames';
import { Navigate } from 'react-router';
import Login from './components/Login/Login';
import { getIsAppInitialized, getIsSidebarHidden } from './redux/app-selector';
import Users from './components/Users/Users';
import Messages from './components/Messages/Messages';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';

const App = () => {
  const isAppInitialized = useSelector(getIsAppInitialized);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isSidebarHidden = useSelector(getIsSidebarHidden);

  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [isErrorShown, setIsErrorShown] = useState(true);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch, isAppInitialized]);

  useEffect(() => {
    const handleRejection = (event) => {
      if (event && event.reason && event.reason.substring) {
        if (event.reason.substring(0, 18) === 'Invalid url format')
          setError(`Couldn't upload profile data`);
        else setError(event.reason);
        setIsErrorShown(true);
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  });

  if (!isAppInitialized) return <LoadingPage />;

  return (
    <div className="w-full h-screen">
      {isLoggedIn && (
        <div className="fixed w-60 xl:w-80 mt-12 z-0">
          <Sidebar />
        </div>
      )}

      <div className="fixed w-full z-20">
        <Header />
      </div>

      <div
        className={cn('p-4 h-full z-10', {
          'ml-60 xl:ml-80': isLoggedIn && !isSidebarHidden,
        })}
      >
        {error && <Error text={error} isShown={isErrorShown} setIsShown={setIsErrorShown} />}
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

const InLinkApp = () => {
  return (
    <StrictMode>
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </StrictMode>
  );
};

export default InLinkApp;
