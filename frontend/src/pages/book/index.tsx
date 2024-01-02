import { getBooks } from '@/api/services';
import BookItem from '@/components/BookItem';
import { TBook } from '@/types/Types';
import React, { useEffect, useState } from 'react';
import Detail from './detail';
import Link from 'next/link';
import Preloader from '@/components/Preloader';
import headers from '@/api/axios';

export default function Index() {
  const [books, setBooks] = useState<TBook[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [idBook, setIdBook] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetBooks = async () => {
    try {
      setIsLoading(true);
      headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      console.log(headers);
      const res = await getBooks();
      setIsLoading(false);
      setBooks(res.data);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      return;
    }
  };
  useEffect(() => {
    handleGetBooks();
  }, []);
  return (
    <div className="flex flex-col gap-8 text-center">
      <div className="flex justify-center gap-5">
        <h2 className="font-bold text-3xl">Book List</h2>
        <Link href={'/book/add'}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Add Book
          </button>
        </Link>
      </div>
      {isLoading && <Preloader></Preloader>}
      {!books.length ? (
        <div
          className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold text-xl">Information</p>
          <p className="text-xl">Books is Empty</p>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-900 py-10 px-12">
          <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book, index) => (
              <div key={index}>
                <BookItem
                  book={book}
                  setIdBook={setIdBook}
                  setShowDetailModal={setShowDetailModal}
                ></BookItem>
              </div>
            ))}
          </div>
        </div>
      )}
      {showDetailModal && (
        <Detail
          idBook={idBook}
          setShowDetailModal={setShowDetailModal}
          handleGetBooks={handleGetBooks}
        ></Detail>
      )}
    </div>
  );
}
