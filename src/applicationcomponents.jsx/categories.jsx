import React, { useState } from "react";

function Categories({ onSelectCategory }) {
  const categories = ["Personal", "Errand", "Work"]; // Add more categories as needed
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex space-x-2">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-2 py-1 rounded-lg text-white text-sm ${
            selectedCategory === category ? "bg-pink-400" : "bg-gray-500"
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Categories;
