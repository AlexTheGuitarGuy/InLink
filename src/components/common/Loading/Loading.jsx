import React from 'react';
import loading from '../../../assets/loading.gif';

const Loading = () => {
  return (
    <span className="flex justify-center items-center h-screen">
      <img src={loading} alt="loading..." />
    </span>
  );
};

export default Loading;
