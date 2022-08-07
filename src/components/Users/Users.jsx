import React, { useEffect } from 'react';
import LoadingPage from '../common/Loading/LoadingPage';
import UserItems from './UserItems/UserItems';
import Paginator from '../common/Paginator/Paginator';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoading,
  getPage,
  getPageSize,
  getPortionSize,
  getTotalUsers,
} from '../../redux/users-page-selector';
import { requestUsers, setPage } from '../../redux/users-page-reducer';

const Users = () => {
  const totalUsers = useSelector(getTotalUsers);
  const isLoading = useSelector(getIsLoading);
  const page = useSelector(getPage);

  const dispatch = useDispatch();

  const pageSize = 8;
  const portionSize = window.innerWidth <= 720 ? 5 : 10;

  const changePage = (page) => {
    dispatch(requestUsers(page, pageSize));
    dispatch(setPage(page));
  };

  useEffect(() => {
    dispatch(requestUsers(page, pageSize));
  }, [dispatch, page, pageSize]);

  if (isLoading) return <LoadingPage />;

  return (
    <div
      className="flex justify-between flex-col
      bg-gray-100 lg:rounded-lg p-8
    text-gray-700 font-semibold
    sm:h-screen lg:h-auto
    "
    >
      <UserItems />
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
