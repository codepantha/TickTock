import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';

import useAuthStore from '../store/authStore';

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState<boolean>();
  const { userProfile }: any = useAuthStore();

  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

  useEffect(() => {
    filterLikes?.length > 0
      ? setAlreadyLiked(true)
      : setAlreadyLiked(false)
  }, [likes, filterLikes]);

  return (
    <div className="gap-6 flex">
      <div
        className="mt-4 flex flex-col justify-center items-center
        cursor-pointer"
      >
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#f51997]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ): (
          <div
            className="bg-primary rounded-full p-2 md:p-4"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
