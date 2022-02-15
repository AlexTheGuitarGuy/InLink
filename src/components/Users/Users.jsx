import React from 'react';
import s from './Users.module.css';
import load from '../../assets/loading.jpg';

const Users = (props) => {
  let mappedUsers = props.state.users.map((e) => {
    let changeFollowStatus = () => {
      props.changeFollowStatus(e.id);
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

  let pagesNb = Math.ceil(props.totalUsers / props.pageSize);

  let mappedPages = [];
  for (let i = 1; i <= pagesNb; i++) {
    mappedPages[i] = (
      <span
        key={i}
        onClick={() => {
          if (i === props.currentPagesBeginning) {
            if (props.currentPagesBeginning - 5 < 1) {
              props.setCurrentPages(1);
            } else
              props.setCurrentPages(props.currentPagesBeginning - 5);
          } else if (i === props.currentPagesBeginning + 9) {
            if (props.currentPagesBeginning + 4 > pagesNb - 10) {
              props.setCurrentPages(pagesNb - 10);
            } else
              props.setCurrentPages(props.currentPagesBeginning + 4);
          }
          props.changePage(i);
        }}
        className={(i === props.page && s.chosenPage) || s.page}
      >
        {`${i} `}
      </span>
    );
  }

  let currentPages = [];
  for (
    let i = props.currentPagesBeginning, lim = i + 10;
    i < lim;
    i++
  ) {
    currentPages[i] = mappedPages[i];
  }

  let pagesBefore = (
    <span
      onClick={() => {
        if (props.page > 1) {
          if (props.page === props.currentPagesBeginning + 1)
            if (props.currentPagesBeginning - 5 < 1) {
              props.setCurrentPages(1);
            } else
              props.setCurrentPages(props.currentPagesBeginning - 5);
          props.changePage(props.page - 1);
        }
      }}
    >
      {'< '}
    </span>
  );

  let pagesAfter = (
    <span
      onClick={() => {
        if (props.currentPagesBeginning < pagesNb - 10) {
          if (props.page === props.currentPagesBeginning + 8) {
            if (props.currentPagesBeginning + 4 > pagesNb - 10) {
              props.setCurrentPages(pagesNb - 10);
            } else
              props.setCurrentPages(props.currentPagesBeginning + 4);
          }
          props.changePage(props.page + 1);
        }
      }}
    >
      {'  >'}
    </span>
  );
  window.loading = props.isLoading;
  return (
    <>
      {props.isLoading ? (
        <img src={load} alt="loading..." className={s.loadImg} />
      ) : (
        <div>
          <span className={s.pages}>
            <div align="center">
              {pagesBefore}
              {currentPages}
              {pagesAfter}
            </div>
          </span>
          <div>{mappedUsers}</div>{' '}
        </div>
      )}
    </>
  );
};

export default Users;
