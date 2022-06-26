import './App.css';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import HeaderContainer from './components/Header/HeaderContainer';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Loading from './components/common/Loading/Loading';
import store from './redux/redux-store';
import { compose } from 'redux';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Error from './components/Error/Error';
import ProfileContainer from './components/Profile/ProfileContainer';
import { getIsLoggedIn } from './redux/auth-selector';
import cn from 'classnames';

const UsersContainer = lazy(() =>
  import('./components/Users/UsersContainer').then(
    ({ default: UsersContainer }) => ({ default: UsersContainer }),
  ),
);

const Login = lazy(() =>
  import('./components/Login/Login').then(({ default: Login }) => ({
    default: Login,
  })),
);

const MessagesContainer = lazy(() =>
  import('./components/Messages/MessagesContainer').then(
    ({ default: MessagesContainer }) => ({
      default: MessagesContainer,
    }),
  ),
);

const App = ({
  state,
  isAppInitialized,
  initializeApp,
  isLoggedIn,
  isSidebarHidden,
}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeApp();
  }, [initializeApp, isAppInitialized]);

  useEffect(() => {
    const handleRejection = (event) => {
      if (event && event.reason && event.reason.substring) {
        if (event.reason.substring(0, 18) === 'Invalid url format')
          setError(`Couldn't upload profile data`);
        else setError(event.reason);
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener(
        'unhandledrejection',
        handleRejection,
      );
    };
  });

  if (!isAppInitialized) return <Loading class="mx-auto" />;

  return (
    <div className="w-full h-screen">
      {isLoggedIn && (
        <div className="fixed w-60 -mt-1.5">
          <Sidebar friends={state.dialogsPage.users} />
        </div>
      )}

      <div className="fixed w-full -mt-14">
        <HeaderContainer />
      </div>

      <div
        className={cn('mt-14 p-4 h-full', {
          'ml-60': isLoggedIn && !isSidebarHidden,
        })}
      >
        {error && <Error text={error} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile/:uid"
            element={<ProfileContainer />}
          />
          <Route path="/profile" element={<ProfileContainer />} />

          <Route path="/messages/*" element={<MessagesContainer />} />

          <Route path="/login" element={<Login />} />
          <Route
            path="/login/facebook"
            element={<div>facebook</div>}
          />
          <Route path="/users" element={<UsersContainer />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const mstp = (state) => ({
  isAppInitialized: state.app.isAppInitialized,
  isLoggedIn: getIsLoggedIn(state),
  isSidebarHidden: state.app.isSidebarHidden,
});

const AppContainer = compose(connect(mstp, { initializeApp }))(App);

const InLinkApp = () => {
  return (
    <React.StrictMode>
      <Suspense
        fallback={
          <span>
            <Loading />
          </span>
        }
      >
        <HashRouter>
          <Provider store={store}>
            <AppContainer
              state={store.getState()}
              dispatch={store.dispatch.bind(store)}
            />
          </Provider>
        </HashRouter>
      </Suspense>
    </React.StrictMode>
  );
};

export default InLinkApp;
