import './App.css';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import Nav from './components/Nav/Nav';
import { HashRouter, Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Preferences from './components/Preferences/Preferences';
import Home from './components/Home/Home';
import HeaderContainer from './components/Header/HeaderContainer';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Loading from './components/common/Loading/Loading';
import store from './redux/redux-store';
import { compose } from 'redux';
import withRouter from './HOC/withRouter';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Error from './components/Error/Error';
import ProfileContainer from './components/Profile/ProfileContainer';

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

const App = ({ state, isAppInitialized, initializeApp }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeApp();
  }, [initializeApp, isAppInitialized]);

  useEffect(() => {
    const handleRejection = (event) => {
      if (event.reason.substring(0, 18) === 'Invalid url format')
        setError(`Couldn't upload profile data`);
      else setError(event.reason);

      event.preventDefault();
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
    <div className="app-wrapper">
      <HeaderContainer />

      <Nav state={state.sidebar} friends={state.dialogsPage.users} />

      <div className="app-wrapper-content">
        {error && (
          <Error
            title={'An unexpected error has occurred'}
            text={error}
            setError={setError}
          />
        )}
        <div className="app-wrapper-content-formating">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile/:uid"
              element={<ProfileContainer />}
            />
            <Route path="/profile" element={<ProfileContainer />} />

            <Route
              path="/messages/*"
              element={<MessagesContainer />}
            />

            <Route path="/login" element={<Login />} />
            <Route
              path="/login/facebook"
              element={<div>facebook</div>}
            />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const mstp = (state) => ({
  isAppInitialized: state.app.isAppInitialized,
});

const AppContainer = compose(
  withRouter,
  connect(mstp, { initializeApp }),
)(App);

const GachiFinderApp = () => {
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

export default GachiFinderApp;
