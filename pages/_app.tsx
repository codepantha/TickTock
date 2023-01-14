import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import '../styles/globals.css';

export const App = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN!}>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-1 flex-col gap-10 overflow-auto h-[88vh] videos">
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;