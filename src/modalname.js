// import React, { useState } from "react";
// import Modal from "react-modal";

// const customStyles = {
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     zIndex: 1000,
//   },
//   content: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "300px",
//     padding: "20px",
//     border: "none",
//     borderRadius: "8px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     backgroundColor: "#fff",
//   },
// };

// Modal.setAppElement("#root");

// const NameModal = ({ isOpen, onRequestClose, onSave }) => {
//   const [name, setName] = useState("");

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleSave = () => {
//     onSave(name);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       style={customStyles}
//       contentLabel="Name Modal"
//     >
//       <h2 className="text-2xl font-semibold mb-4">Welcome to the Todo App</h2>
//       <p>Please enter your name:</p>
//       <input
//         type="text"
//         value={name}
//         onChange={handleNameChange}
//         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
//       />
//       <button
//         onClick={handleSave}
//         className="mt-4 py-2 px-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300"
//       >
//         Save
//       </button>
//     </Modal>
//   );
// };

// export default NameModal;
