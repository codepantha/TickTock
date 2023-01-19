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
import ProfileLink from '../../components/ProfileLink';

interface Prop {
  videos: Video[];
}

const Search = ({ videos }: Prop) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

  console.log(allUsers);
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm?.toLowerCase())
  );
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
              <ProfileLink
                key={idx}
                userId={user._id}
                imgSrc={user.image}
                userName={user.userName}
                style="border-b-2 border-gray-200"
              />
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
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
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
