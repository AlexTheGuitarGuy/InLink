import React from 'react';
import s from './Users.module.css';
import Loading from '../common/Loading/Loading';
import UserItems from './UserItems/UserItems';
import Paginator from '../common/Paginator/Paginator';

const Users = ({
  totalUsers,
  pageSize,
  changePage,
  page,
  followQueue,
  updateFollowQueue,
  users,
  follow,
  unfollow,
  isLoading,
  portionSize,
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
        pageSize={pageSize}
        portionSize={portionSize}
        totalUsers={totalUsers}
        changePage={changePage}
        page={page}
      />
    </div>
  );
};

export default Users;
