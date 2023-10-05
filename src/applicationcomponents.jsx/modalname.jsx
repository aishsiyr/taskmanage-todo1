// modalname.js
import React, { useState } from 'react';

function ModalName({ onSaveName, onClose }) {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSaveClick = () => {
    onSaveName(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-pink-200 rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Enter Your Name</h2>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Your Name"
          className="mt-1 p-2 border border-gray-400 rounded-md w-full focus:ring focus:ring-yellow-300 focus:outline-none hover:border-yellow-500"
        />
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSaveClick}
            className="bg-pink-400 text-white font-semibold py-2 px-4 rounded-full focus:outline-none hover:bg-pink-400"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalName;
