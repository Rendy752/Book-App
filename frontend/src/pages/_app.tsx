'use client';
import { useEffect } from 'react';
import '../../styles/global.css';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/api/services';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TUser } from '@/types/Types';
import { Toaster } from 'react-hot-toast';
import { signal } from '@preact/signals-react';
import headers from '@/api/axios';
import Head from 'next/head';

export const isLoggedIn = signal(false);
export const user = signal<TUser>({
  id: 0,
  name: 'Anonymous',
  email: '',
});

export default function App({ Component, pageProps }: any) {
  const router = useRouter();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        const res = await getProfile();
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
      <Head>
        <link rel="shortcut icon" href="/logo.ico" />
      </Head>

      <Navbar></Navbar>
      <main className="flex items-center justify-center p-12">
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </main>
      <Footer></Footer>
    </>
  );
}
