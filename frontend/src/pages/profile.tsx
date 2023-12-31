import React from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const { id, name, email } = router.query;
  return (
    <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
      <h1 className="text-3xl font-bold text-center text-gray-700">
        User Profile
      </h1>
      <div className="mt-6">
        <div className="mb-4">
          <label
            htmlFor="id"
            className="block text-sm font-semibold text-gray-800"
          >
            Id
          </label>
          <input
            value={id}
            disabled
            id="id"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <input
            value={name}
            disabled
            id="email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="email_verified_at"
            className="block text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <input
            value={email}
            disabled
            type="email"
            id="email_verified_at"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mt-2">
          <button
            onClick={() => router.replace('/book')}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
