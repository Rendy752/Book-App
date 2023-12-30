import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-gray-800 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-white font-semibold py-1">
              Copyright © 2023 BooksApp
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
