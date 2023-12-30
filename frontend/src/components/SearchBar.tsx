import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function SearchBar() {
  const [searchId, setSearchId] = React.useState<number>(0);
  const searchKeyDownHandler = (e: any) => {
    if (e.key === 'Enter') {
      setSearchId(e.currentTarget.value);
    }
  };
  // console.log(searchId);
  return (
    <div className="flex flex-1 items-center justify-center m-36">
      <div className="flex relative">
        <input
          className="bg-white rounded-full focus:outline-none p-2"
          placeholder="Search by id..."
          onKeyDown={searchKeyDownHandler}
        />
        <div className="absolute right-2 my-2">
          <MagnifyingGlassIcon className="h-6 w-6 text-black" />
        </div>
      </div>
    </div>
  );
}
