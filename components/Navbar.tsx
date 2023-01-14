import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/ticktock-logo.png';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';
import { AiOutlineLogout } from 'react-icons/ai';

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  const logOut = (): void => {
    googleLogout();
    removeUser();
  };

  return (
    <nav
      className="w-full flex justify-between items-center
      border-b-2 border-gray-200 py-2 px-4"
    >
      <Link href="">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TickTock Logo"
            layout="responsive"
          />
        </div>
      </Link>

      <div>SEARCH</div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button
                className="border-2 px-2 md:px-4 text-md font-semibold
                  flex items-center"
              >
                <IoMdAdd className="text-xl" /> {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>

            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    src={userProfile.image}
                    alt="Profile pic"
                    width={40}
                    height={40}
                  />
                </>
              </Link>
            )}

            <button className="px-2" type="button" onClick={logOut}>
              <AiOutlineLogout />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Error')}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
