import React, { useState } from 'react';


export default function SearchBar({ onSearch, onUseGeo }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const city = input.trim();
    if (!city) return;
    onSearch(city);
    setInput('');
  };

  return (
    <div className="flex w-full">
      <form onSubmit={handleSubmit} className="flex flex-grow">
        <input
          type="text"
          placeholder="Enter city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l"
        />
        <button
          type="submit"
          className="p-2 bg-sky text-white hover:bg-sky-dark rounded-r"
        >
          Search
        </button>
      </form>
      <button
        type="button"
        onClick={onUseGeo}
        title="Use my location"
        className="ml-2 p-2 bg-sun hover:bg-sun-dark text-white rounded"
      >
        📍
      </button>
    </div>
  );
}
