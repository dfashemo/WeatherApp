//Loading... lol
import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center space-x-2 my-4">
      {[0,1,2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 bg-indigo-600 rounded-full"
          style={{
            animation: `bounce 0.6s ${i * 0.2}s infinite both`
          }}
        />
      ))}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0) }
          40% { transform: translateY(-8px) }
        }
      `}</style>
    </div>
  );
}
