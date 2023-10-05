import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "../app.css";

function App() {
  // Function to toggle dark mode

  // Apply dark mode class to the body element when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <nav className={`bg-pink-200 p-7`}>
      <div className="container mx-auto flex items-center justify-between">
        <a
          href="#"
          className={`text-3xl flex items-center font-mono text-white  }`}
        >
          TRACKIT.
        </a>
        <button
          onClick={toggleDarkMode}
          className={`text-2xl } focus:outline-none`}
        >
          {/* {darkMode ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )} */}
        </button>
      </div>
    </nav>
  );
}

export default App;
