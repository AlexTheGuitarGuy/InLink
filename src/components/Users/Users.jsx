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
          className={
            (i === this.props.page && s.chosenPage) || s.page
          }
        >
          {`${i} `}
        </span>
      );
    }

    let currentPages = [];
    for (
      let i = this.props.currentPagesBeginning, lim = i + 10;
      i < lim;
      i++
    ) {
      currentPages[i] = mappedPages[i];
    }

    let pagesBefore = (
      <span
        onClick={() => {
          if (
            this.props.currentPagesBeginning > 1 &&
            this.props.page === this.props.currentPagesBeginning - 9
          )
            this.props.setCurrentPages(
              this.props.currentPagesBeginning - 5,
            );
          this.changePage(this.props.page - 1);
        }}
      >
        {'< '}
      </span>
    );

    let pagesAfter = (
      <span
        onClick={() => {
          if (
            this.props.currentPagesBeginning < pagesNb - 10 &&
            this.props.page === this.props.currentPagesBeginning + 9
          )
            this.props.setCurrentPages(
              this.props.currentPagesBeginning + 5,
            );
          this.changePage(this.props.page + 1);
        }}
      >
        {'  >'}
      </span>
    );

    return (
      <div>
        <span className={s.pages}>
          <div align="center">
            {pagesBefore}
            {currentPages}
            {pagesAfter}
          </div>
        </span>
        <div>{mappedUsers}</div>
      </div>
    );
  }
}

export default Users;
