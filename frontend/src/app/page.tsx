'use client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import List from '@/pages/book/List';
import Login from '@/pages/user/Login';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <main className="flex items-center justify-center p-24">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<List />} />
        </Routes>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  );
}
