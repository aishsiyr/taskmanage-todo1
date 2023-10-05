import React, { useEffect, useState } from 'react';
import ModalName from './modalname';
import Task from './tasks';
import Categories from './categories';

function Body() {
  const [showModal, setShowModal] = useState(true);
  const [userName, setUserName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [taskText, setTaskText] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const handleNameSave = (name) => {
    setUserName(name);
    setShowModal(false);
  };

  const addTask = () => {
    if (taskText.trim() === '' || selectedDate === '') {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      status: 'pending',
      createdOn: selectedDate,
    };
    setTasks([...tasks, newTask]);
    setTaskText('');
    setSelectedDate('');
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    openModal();
  }, []);

  return (
    <div className="flex p-16 h-screen bg-gray-700 text-white">
      <div className="p-5 mx-auto bg-pink-300 rounded-lg shadow-sm w-full">
        <h2 className="text-5xl font-semibold mb-4 text-center text-gray-600">
          YOURTASK
        </h2>
        <div className="text-left">
          {userName && (
            <div className="text-center mt-4">
              <p className="text-lg font-semibold text-gray-800">Hi, {userName}</p>
            </div>
          )}
          {showModal && (
            <ModalName onSaveName={handleNameSave} onClose={() => setShowModal(false)} />
          )}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); addTask(); }}>
          <div className="mb-4">
            <label htmlFor="task" className="block text-xl font-medium text-gray-200">
              Task
            </label>
            <input
              type="text"
              id="task"
              name="task"
              className="mt-1 p-2 border border-gray-400 rounded-md w-full focus:ring focus:ring-yellow-300 focus:outline-none hover:border-yellow-500"
              placeholder="Task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="taskDate" className="block text-xl font-medium text-gray-200">
              Task Date
            </label>
            <input
              type="date"
              id="taskDate"
              name="taskDate"
              className="mt-1 p-2 border border-gray-400 rounded-md w-full focus:ring focus:ring-yellow-300 focus:outline-none hover:border-yellow-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center p-4">
            <button
              type="submit"
              className="flex items-center w-4/3 bg-gradient-to-r from-gray-700 via-gray-700 to-gray-700 hover:from-pink-500 hover:via-pink-400 hover:to-pink-400 text-white font-semibold py-3 px-6 rounded-full focus:outline-none transform transition-transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-plus mr-2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add your task
            </button>
          </div>
        </form>
        <div className="mt-4 font-mono">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onUpdateStatus={updateTaskStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Body;