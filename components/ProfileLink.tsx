import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GoVerified } from 'react-icons/go';

interface Props {
  userId: string;
  imgSrc: string;
  userName: string;
  style?: string;
}

const ProfileLink = ({ userId, imgSrc, userName, style }: Props) => {
  return (
    <div className={`flex gap-3 p-2 items-center cursor-pointer font-semibold rounded ${style}`}>
      <div className="md:w-16 md:h-16 w-10 h-10">
        <Link href={`/profile/${userId}`}>
          <>
            <Image
              width={62}
              height={62}
              className="rounded-full"
              src={imgSrc}
              alt="profile photo"
              layout="responsive"
            />
          </>
        </Link>
      </div>
      <div>
        <Link href={`/profile/${userId}`}>
          <div className="flex items-center gap-2">
            <p
              className="flex gap-2 items-center md:text-md
                    font-bold text-primary"
            >
              {userName} {` `}
              <GoVerified className="text-blue-400 text-md" />
            </p>
            <p
              className="capitalize font-medium text-sm
                text-gray-500 hidden md:block"
            >
              {userName}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileLink;
