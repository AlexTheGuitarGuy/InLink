import React from 'react';
import s from './Users.module.css';
import Loading from '../common/Loading/Loading';
import UserItems from './UserItems/UserItems';
import Paginator from '../common/Paginator/Paginator';

const Users = ({
  totalUsers,
  pageSize,
  currentPagesBeginning,
  setCurrentPages,
  changePage,
  page,
  followQueue,
  updateFollowQueue,
  users,
  follow,
  unfollow,
  isLoading,
}) => {
  if (isLoading) return <Loading class={s.loadImg} />;

  return (
    <div>
      <UserItems
        followQueue={followQueue}
        updateFollowQueue={updateFollowQueue}
        users={users}
        follow={follow}
        unfollow={unfollow}
      />
      <Paginator
        totalUsers={totalUsers}
        pageSize={pageSize}
        currentPagesBeginning={currentPagesBeginning}
        setCurrentPages={setCurrentPages}
        changePage={changePage}
        page={page}
      />
    </div>
  );
};

export default Users;
