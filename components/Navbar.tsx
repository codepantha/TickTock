import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google'

import Logo from '../utils/ticktock-logo.png';
import { createOrGetUser } from '../utils';

const Navbar = () => {
  const user = false;

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
        {user ? (
          <div>LOGGED IN</div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response)}
            onError={() => console.log('Error')}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
