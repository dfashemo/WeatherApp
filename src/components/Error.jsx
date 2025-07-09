import React from 'react';

//Display error message if search request is invalid (unknown city name, typos, etc.)
export default function Error({ message }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4 max-w-md" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
