import React from 'react';

function Button({ text, onClick, blue, disabled }) {
  return (
    <button
      className={`text-center text-[0.9rem] mx-[0.5rem] 
        p-2 border-[1px] rounded-md cursor-pointer 
        h-auto transition duration-500 
        ${blue
          ? 'bg-purple capitalize text-white border-theme hover:bg-white hover:text-purple'
          : 'bg-white text-purple border-theme hover:bg-purple hover:text-white mt-5 capitalize'
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
