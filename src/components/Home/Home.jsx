import React, {Component} from 'react';
import s from './Home.module.css';

export default class Home extends Component {
  render() {
    return (
      <div className={s.text}>
        <h1>Welcome to the club, buddy!</h1>
      </div>
    );
  }
}
