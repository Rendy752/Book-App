'use client';
import { useEffect, useState } from 'react';
import '../../styles/global.css';
import { useRouter } from 'next/navigation';
import { getBooks, getProfile } from '@/api/services';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TUser } from '@/types/Types';

export default function App({ Component, pageProps }: any) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<TUser>({
    id: 0,
    name: 'Anonymous',
    email: '',
  });
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await getProfile();
        setUser(res.user);
        setUser((prev) => ({
          ...prev,
          id: res.id,
          name: res.name,
          email: res.email,
        }));
        setIsLoggedIn(true);
        router.replace('/book');
      } catch (e: any) {
        setIsLoggedIn(false);
        router.replace('/login');
      }
    };
    checkLogin();
  }, []);

  console.log(isLoggedIn);
  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        user={user}
      ></Navbar>
      <main className="flex items-center justify-center p-24">
        <Component {...pageProps} />
      </main>
      <Footer></Footer>
    </>
  );
}
