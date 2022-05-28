import './App.css';
import React, { useEffect } from 'react';
import Nav from './components/Nav/Nav';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Preferences from './components/Preferences/Preferences';
import Home from './components/Home/Home';
import MessagesContainer from './components/Messages/MessagesContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Loading from './components/common/Loading/Loading';
import store from './redux/redux-store';
import { compose } from 'redux';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let params = useParams();
    return <Component {...props} router={{ location, params }} />;
  }

  return ComponentWithRouterProp;
}

const App = (props) => {
  useEffect(() => {
    props.initializeApp();
  }, [props.isAppInitialized]);

  if (!props.isAppInitialized) return <Loading class="mx-auto" />;

  return (
    <div className="app-wrapper">
      <HeaderContainer />

      <Nav
        state={props.state.sidebar}
        friends={props.state.dialogsPage.users}
      />

      <div className="app-wrapper-content">
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
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/preferences" element={<Preferences />} />
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
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer
            state={store.getState()}
            dispatch={store.dispatch.bind(store)}
          />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default GachiFinderApp;
