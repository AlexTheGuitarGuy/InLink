import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Profile from './components/Profile/Profile';
import {Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Preferences from './components/Preferences/Preferences';
import Home from './components/Home/Home';
import { MessagesContainer } from './components/Messages/MessagesContainer';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />

      <Nav state={props.state.sidebar}
        friends={props.state.dialogsPage.users} />

      <div className='app-wrapper-content'>

        <div className='app-wrapper-content-formating'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile'
              element={<Profile state={props.state.profilePage}
                profileData={props.state.userData.profileData}
                />} />

            <Route path='/messages'
              element={<MessagesContainer state={props.state.dialogsPage}
                profileData={props.state.userData.profileData}
                />} />

            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/preferences' element={<Preferences />} />
          </Routes>
        </div>

      </div>

    </div >
  );
}

export default App;