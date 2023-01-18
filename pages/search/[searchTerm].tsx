import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { BASE_URL } from '../../utils';
import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import Link from 'next/link';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';

interface Prop {
  videos: Video[];
}

const Search = ({ videos }: Prop) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter()
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

  console.log(allUsers)
  const searchedAccounts = allUsers.filter((user: IUser) => (
    user.userName.toLowerCase().includes(searchTerm?.toLowerCase())
  ));
  console.log('filtered Accounts', searchedAccounts);

  return (
    <div>
      <div
        className="flex gap-10 border-b-2 border-gray-200
          bg-white w-full"
      >
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>

      {isAccounts ? (
        <div className="md:mt-16">
        {searchedAccounts.length ? (
          searchedAccounts.map((user: IUser, idx: number) => (
            <Link href={`/profile/${user._id}`} key={idx}>
              <div className="flex items-start gap-3 cursor-pointer">
                <div>
                  <Image
                    src={user.image}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt="user profile"
                  />
                </div>

                <div className="hidden xl:block">
                  <p
                    className="flex gap-1 items-center text md font-bold
                        text-primary lowercase"
                  >
                    {user.userName.replaceAll(' ', '')}
                    <GoVerified className="text-blue-400" />
                  </p>
                  <p className="capitalize text-gray-400 text-xs">
                    {user.userName}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <NoResults text={`No user results for ${searchTerm}`} />
        )}
      </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video, idx: number) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : <NoResults text={`No video results for ${searchTerm}`} />}
        </div>
      )}
    </div>
  );
};

type Props = {
  params: {
    searchTerm: string;
  };
};

export const getServerSideProps = async ({ params: { searchTerm } }: Props) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: {
      videos: res.data
    }
  };
};

export default Search;
