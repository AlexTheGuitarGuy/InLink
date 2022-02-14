import React from 'react';
import s from './Users.module.css';
import * as axios from 'axios';

class Users extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.page}&count=${this.props.pageSize}`,
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsers(response.data.totalCount);
      });
  }

  changePage(page) {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`,
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setPage(page);
      });
  }

  render() {
    let mappedUsers = this.props.state.users.map((e) => {
      let changeFollowStatus = () => {
        this.props.changeFollowStatus(e.id);
      };

      return (
        <div className={s.user} key={e.id}>
          <div>
            {e.photos.small != null ? (
              <img src={e.photos.small} alt="userPfp" />
            ) : (
              <img
                src={require('../../assets/pfps/placeholder.jpg')}
                alt="empty_pfp"
              />
            )}
          </div>
          <div>{e.name}</div>
          <button onClick={changeFollowStatus}>
            {e.isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      );
    });

    let pagesNb = Math.ceil(
      this.props.totalUsers / this.props.pageSize,
    );

    let mappedPages = [];
    for (let i = 1; i <= pagesNb; i++) {
      mappedPages[i] = (
        <span
          key={i}
          onClick={() => {
            this.changePage(i);
          }}
          className={i === this.props.page && s.chosenPage}
        >
          {`${i} `}
        </span>
      );
    }

    return (
      <div>
        {mappedPages}
        {mappedUsers}
      </div>
    );
  }
}

export default Users;
