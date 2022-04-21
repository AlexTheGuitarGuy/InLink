import React from 'react';
import s from './Users.module.css';
import Loading from '../common/Loading/Loading';
import UserItems from './UserItems/UserItems';

const Users = (props) => {
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
              props.setCurrentPages(pagesNb - 9);
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

  let firstPage = (
    <span
      onClick={() => {
        props.setCurrentPages(1);
        props.changePage(1);
      }}
    >
      {'<< '}
    </span>
  );
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

  let lastPage = (
    <span
      onClick={() => {
        props.setCurrentPages(pagesNb - 9);
        props.changePage(pagesNb);
      }}
    >
      {'  >>'}
    </span>
  );

  let pagesAfter = (
    <span
      onClick={() => {
        if (props.page < pagesNb) {
          if (props.page === props.currentPagesBeginning + 8) {
            if (props.currentPagesBeginning + 4 > pagesNb - 10) {
              props.setCurrentPages(pagesNb - 9);
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

  return (
    <>
      {props.isLoading ? (
        <div>
          <Loading class={s.loadImg} />
        </div>
      ) : (
        <div>
          <UserItems
            followQueue={props.followQueue}
            updateFollowQueue={props.updateFollowQueue}
            users={props.state.users}
            follow={props.follow}
            unfollow={props.unfollow}
          />
          <span className={s.pages}>
            <div align="center">
              {firstPage}
              {pagesBefore}
              {currentPages}
              {pagesAfter}
              {lastPage}
            </div>
          </span>
        </div>
      )}
    </>
  );
};

export default Users;
