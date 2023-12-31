import { editBook, getSpesificBook } from '@/api/services';
import { Errors } from '@/components/Errors';
import Preloader from '@/components/Preloader';
import { IError } from '@/types/Types';
import React, { useEffect, useState } from 'react';

interface TProps {
  idBook: number;
  setShowEditModal: Function;
  handleGetBooks: Function;
}

export default function Edit({
  idBook,
  setShowEditModal,
  handleGetBooks,
}: TProps) {
  //   const [book, setBook] = useState<TBook>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IError>({ message: '' });
  const [isbn, setIsbn] = useState(0);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pages, setPages] = useState(0);
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    const handleGetSpesificBook = async () => {
      try {
        setIsLoading(true);
        const res = await getSpesificBook(idBook);
        // console.log(res);
        setIsbn(res.isbn);
        setTitle(res.title);
        setSubtitle(res.subtitle);
        setAuthor(res.author);
        setPublished(res.published);
        setPublisher(res.publisher);
        setPages(res.pages);
        setDescription(res.description);
        setWebsite(res.website);
        setIsLoading(false);
        // setBook(res);
      } catch (e: any) {
        setIsLoading(false);
        setError((prev) => ({ ...prev, message: e }));
      }
    };
    handleGetSpesificBook();
  }, []);

  const handleEditBook = async () => {
    try {
      setIsLoading(true);
      await editBook(
        idBook,
        isbn,
        title,
        subtitle,
        author,
        published,
        publisher,
        pages,
        description,
        website,
      );
      setError((prev) => ({ ...prev, message: '' }));
      setShowEditModal(false);
      setIsLoading(false);
      handleGetBooks();
    } catch (e: any) {
      setIsLoading(false);
      setError((prev) => ({ ...prev, message: e }));
    }
  };

  return (
    <>
      <div className="justify-center items-center block overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Edit Book</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowEditModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  &#10006;
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form className="mt-6">
                {error.message && (
                  <div className="mb-4">
                    <Errors error={error.message}></Errors>
                  </div>
                )}
                {isLoading && (
                  <div className="mb-4">
                    <Preloader></Preloader>
                  </div>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="isbn"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Isbn
                  </label>
                  <input
                    id="isbn"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="subtitle"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Subtitle
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <div className="mb-2 w-full">
                    <label
                      htmlFor="author"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-2 w-full">
                    <label
                      htmlFor="published"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Published
                    </label>
                    <input
                      type="datetime-local"
                      id="published"
                      value={published}
                      onChange={(e) => setPublished(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  <div className="mb-2 w-full">
                    <label
                      htmlFor="publisher"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Publisher
                    </label>
                    <input
                      type="text"
                      id="publisher"
                      value={publisher}
                      onChange={(e) => setPublisher(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-2 w-full">
                    <label
                      htmlFor="pages"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Pages
                    </label>
                    <input
                      type="text"
                      id="pages"
                      value={pages}
                      onChange={(e) => setPages(Number(e.target.value))}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="website"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Website
                  </label>
                  <input
                    type="text"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-slate-300 rounded shadow hover:shadow-lg"
                type="button"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </button>
              {isLoading ? (
                <Preloader></Preloader>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleEditBook()}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
