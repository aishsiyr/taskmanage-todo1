import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

function Filter({ tasks }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Function to toggle the filter
  const handleFilterToggle = () => {
    setFilterActive(!filterActive);
  };

  // Get unique categories from tasks, using optional chaining to handle undefined tasks
  const uniqueCategories = tasks?.length
    ? [...new Set(tasks.map((task) => task.category))]
    : [];

  // Display tasks based on the selected category
  const filteredTasks = filterActive
    ? tasks?.filter((task) => task.category === selectedCategory)
    : tasks;

  return (
    <div>
      <h1>Task List</h1>

      {/* Filter button with FontAwesome icon */}
      <button onClick={handleFilterToggle}>
        <FontAwesomeIcon icon={faFilter} /> Filter
      </button>

      {/* Dropdown for categories */}
      {filterActive && (
        <select
          value={selectedCategory}
          onChange={(e) => handleCategorySelect(e.target.value)}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      )}

      {/* Display filtered tasks */}
      <ul>
        {filteredTasks?.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;
    