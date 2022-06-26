import React from 'react';
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
  if (isLoading) return <Loading />;

  return (
    <div
      className="flex justify-between flex-col
      bg-gray-100 rounded-lg p-8
    text-gray-700 font-semibold"
    >
      <UserItems
        followQueue={followQueue}
        updateFollowQueue={updateFollowQueue}
        users={users}
        follow={follow}
        unfollow={unfollow}
      />
      <div className="mt-4">
        <Paginator
          pageSize={pageSize}
          portionSize={portionSize}
          totalElems={totalUsers}
          changePage={changePage}
          page={page}
        />
      </div>
    </div>
  );
};

export default Users;
