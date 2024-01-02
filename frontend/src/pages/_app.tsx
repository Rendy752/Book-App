'use client';
import { useEffect, useState } from 'react';
import '../../styles/global.css';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/api/services';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TUser } from '@/types/Types';
import { Toaster } from 'react-hot-toast';
import { signal } from '@preact/signals-react';
import headers from '@/api/axios';

export const isLoggedIn = signal(false);
export const user = signal<TUser>({
  id: 0,
  name: 'Anonymous',
  email: '',
});
export default function App({ Component, pageProps }: any) {
  const router = useRouter();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState<TUser>({
  //   id: 0,
  //   name: 'Anonymous',
  //   email: '',
  // });

  useEffect(() => {
    const checkLogin = async () => {
      try {
        console.log(
          typeof window !== 'undefined'
            ? window.localStorage.getItem('token')
            : '',
        );
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        console.log(headers);
        const res = await getProfile();
        // setUser((prev) => ({
        //   ...prev,
        //   id: res.id,
        //   name: res.name,
        //   email: res.email,
        // }));
        user.value.id = res.id;
        user.value.name = res.name;
        user.value.email = res.email;
        isLoggedIn.value = true;
        router.replace('/book');
      } catch (e: any) {
        isLoggedIn.value = false;
        router.replace('/login');
      }
    };
    checkLogin();
  }, []);
  // console.log(isLoggedIn);
  return (
    <>
      <Navbar></Navbar>
      <main className="flex items-center justify-center p-12">
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </main>
      <Footer></Footer>
    </>
  );
}
