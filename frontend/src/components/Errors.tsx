import React from 'react';

type TProps = {
  error: string;
};

export const Errors = ({ error }: TProps) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{error}</span>
    </div>
  );
};
