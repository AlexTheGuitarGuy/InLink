import React from 'react';
import LikeIcon from '../../../../assets/like.jpg';

const PostCard = ({ text, likeCount, pfp, userName }) => {
  return (
    <div className="mt-4 flex flex-col">
      <div
        className="order-1 p-4
      border-x border-t border-gray-300
      rounded-tl-lg rounded-tr-lg
      bg-gray-100 text-gray-700"
      >
        <img
          src={pfp}
          alt="poster_pfp"
          className="rounded-full w-10 h-10 bg-gray-700 p-0.5 inline"
        />
        <span className="ml-2">{userName}</span>
      </div>

      <div
        className="order-2 p-4
        border border-gray-300
        rounded-bl-lg rounded-br-lg
                    bg-gray-200
                    text-gray-700"
      >
        <div className="text-center mt-2 break-words">{text}</div>
        <div className="mt-2">
          <img
            src={LikeIcon}
            alt="likes"
            className="w-4 h-4 inline mb-1 mr-1.5"
          />
          {likeCount}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
