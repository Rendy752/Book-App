'use client';
import Navbar from '@/components/Navbar';
import List from '@/app/pages/book';
// import Login from '@/pages/login';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { getBooks } from '@/api/services';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        await getBooks();
        setIsLoggedIn(true);
        // router.replace('/book/index');
        return;
      } catch (e: any) {
        setIsLoggedIn(false);
        // router.replace('/login');
        return;
      }
    };
    checkLogin();
  }, []);

  console.log(isLoggedIn);
  return (
    <>
      <Navbar></Navbar>
      <main className="flex items-center justify-center p-24"></main>
      <Footer></Footer>
    </>
  );
}
