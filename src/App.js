import './App.css';
import React from 'react';
import Nav from './components/Nav/Nav';
import { Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Preferences from './components/Preferences/Preferences';
import Home from './components/Home/Home';
import MessagesContainer from './components/Messages/MessagesContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

const App = (props) => {
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

export default App;
