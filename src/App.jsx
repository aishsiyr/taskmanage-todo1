import React, { useEffect, useState } from "react";
import "./app.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { faEdit, faFolder } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "react-calendar";
import "./calendar.css"; // Import the custom calendar styles
const categories = ["Work", "Personal", "Errands", "Health"];

function App() {
  const [userName, setUserName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [lightTheme, setLightTheme] = useState(false);
  const [showModal, setShowModal] = useState(!userName);
  const [tasks, setTasks] = useState([]);
  // const [undoTask, setUndoTask] = useState(null);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [deletedTask, setDeletedTask] = useState(null);

  const [isTaskEdited, setIsTaskEdited] = useState(false);
  const [showCalendar, setShowCalendar] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleTasks, setScheduleTasks] = useState([]);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
      setShowModal(false);
    }
  }, []);

  const handleCategoryChange = (category, e) => {
    e.preventDefault(); // Prevent form submission
    setSelectedCategory(category);
  };

  const toggleTheme = () => {
    setLightTheme(!lightTheme);
  };

  const handleNameSave = (name) => {
    setUserName(name);
    localStorage.setItem("userName", name);
    setShowModal(false);
  };

  const handleEditSave = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? editedTask : task
    );
    setTasks(updatedTasks);
    setEditingIndex(-1);
    setEditedTask({ title: "", description: "", category: "" });
    setIsTaskEdited(false); // Reset isTaskEdited after saving the edits
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setEditedTask({ title: "", description: "", category: "" });
  };

  const handleDeleteTask = (index) => {
    const deletedTask = tasks[index];
    setDeletedTask(deletedTask);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleStartEdit = (index) => {
    setEditingIndex(index);
    setEditedTask({ ...tasks[index] });
    setIsTaskEdited(false); // Set to false when starting to edit
  };

  const startEditingTask = (index) => {
    setEditingIndex(index);
    const editedTaskCopy = { ...tasks[index] };
    setEditedTask(editedTaskCopy);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log(tasks);
  const handleScheduleTask = () => {
    if (!editedTask.title || !editedTask.description || !selectedCategory) {
      toast.error("Please fill in all the task details.", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return; // Exit if any task details are missing
    }

    const newScheduledTask = {
      task: {
        title: editedTask.title,
        description: editedTask.description,
        category: selectedCategory,
      },
      date: selectedDate, // Use the selectedDate here
    };

    setScheduleTasks([...scheduleTasks, newScheduledTask]);

    toast.success("Task scheduled successfully", {
      position: "top-right",
      autoClose: 3000,
      className: `${
        lightTheme ? "bg-green-500 text-white" : "bg-green-700 text-gray-200"
      }`,
    });
  };

  return (
    <div
      className={`${
        lightTheme ? "bg-gray-100 text-gray-800" : "bg-gray-900 text-white"
      } min-h-screen p-10 flex flex-col justify-center items-center transition-all duration-300 `}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastClassName="toastify-dark"
      />
     
     
      <div className=" max-w-md sm:w-4/5">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className={`text-xl ${
              lightTheme ? "text-gray-800" : "text-white"
            } transition-colors duration-300`}
          >
            <FontAwesomeIcon icon={lightTheme ? faMoon : faSun} />
          </button>
        </div>

        <h2 className="text-4xl font-bold mb-6 text-center">Task Planner</h2>
        <Modal
          isOpen={showModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            },
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              padding: "20px",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: lightTheme ? "#fff" : "#333",
              color: lightTheme ? "#333" : "#fff",
            },
          }}
          contentLabel="Name Modal"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Welcome to the Todo App
          </h2>
          <p className="mb-2 text-center">Please enter your name:</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              lightTheme ? "bg-gray-100" : "bg-gray-800 text-white"
            } focus:border-purple-400`}
          />

          <button
            onClick={() => handleNameSave(userName)}
            className={`mt-4 py-2 px-6 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 ${
              lightTheme
                ? "bg-purple-500 text-white hover:bg-purple-600"
                : "bg-gray-900 text-white hover:bg-gray-700 hover:text-gray-200"
            }`}
          >
            Save
          </button>
        </Modal>
        {userName ? (
          <div className="max-w-md mx-auto mt-6">
            <h3 className="text-2xl font-semibold mb-4">Hi, {userName}!</h3>
          </div>
        ) : null}
        <div
          className={`${
            lightTheme ? "bg-gray-200" : "bg-gray-700"
          } rounded-lg shadow-lg p-6 mt-10 transition-opacity`}
        >
          <h3 className="text-2xl font-semibold mb-4">Create A Todo</h3>
          <form id="new-todo-form">
            <div className="relative mb-4">
              <input
                type="text"
                name="goalTitle"
                id="goalTitle"
                placeholder="Enter your goal title"
                className={`${
                  lightTheme
                    ? "bg-gray-300 text-gray-800"
                    : "bg-gray-700 text-gray-300"
                } rounded-lg px-4 py-2 w-full focus:outline-none focus:border-purple-400`}
              />
              <div className="relative mt-4">
                <textarea
                  name="goalDescription"
                  id="goalDescription"
                  rows="3"
                  placeholder="Enter your goal description"
                  className={`${
                    lightTheme
                      ? "bg-gray-300 text-gray-800"
                      : "bg-gray-700 text-gray-300"
                  } rounded-lg px-4 py-2 w-full focus:outline-none focus:border-purple-400 resize-none`}
                ></textarea>
              </div>
            </div>

            <h4 className="text-lg font-semibold mb-2">Pick A Category</h4>
            <div className="category-dropdown">
              <select
                className={`w-full p-2 rounded-md ${
                  lightTheme ? "bg-gray-300" : "bg-gray-700"
                }`}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="category-buttons">
              {/* Render buttons for larger devices */}
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-5 py-2 rounded-md text-sm mr-3 ml-1 ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white border-blue-500"
                      : lightTheme
                      ? "bg-gray-300 text-gray-800 border-gray-300"
                      : "bg-gray-800 text-gray-300 border-gray-500"
                  } hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-md transition-colors duration-300`}
                  onClick={(e) => handleCategoryChange(category, e)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              {/* <Calendar
                onChange={setSelectedDate} // Update the selected date in state
                value={selectedDate} // Set the selected date from state
                className="mt-4 p-4 bg-white rounded-lg shadow-md"
              /> */}

              <button
                className={`${
                  lightTheme
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-900 text-white hover:bg-gray-700 hover:text-gray-200 rounded border border-gray-900"
                } py-2 px-6 rounded-md text-sm font-semibold transform hover:scale-105 transition-all duration-800`}
                onClick={(e) => {
                  e.preventDefault();
                  if (isAddingTask) {
                    return; // Exit if a task is already being added
                  }
                  const goalTitle = document.getElementById("goalTitle").value;
                  const goalDescription =
                    document.getElementById("goalDescription").value;

                  if (
                    goalTitle.trim() === "" ||
                    goalDescription.trim() === ""
                  ) {
                    toast.error(
                      "Please enter the goal title and description.",
                      {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      }
                    );
                    return; // Return early if the fields are empty
                  }
                  setIsAddingTask(true);

                  const newTask = {
                    title: goalTitle,
                    description: goalDescription,
                    category: selectedCategory,
                  };

                  toast.success("Task added successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    className: `${
                      lightTheme
                        ? "bg-green-500 text-white"
                        : "bg-green-700 text-gray-200"
                    }`,
                    onClose: () => {
                      // Set isAddingTask to false after the toast is closed
                      setIsAddingTask(false);
                    },
                  });
                  setIsAddingTask(true);
                  setTasks([...tasks, newTask]);
                  document.getElementById("goalTitle").value = "";
                  document.getElementById("goalDescription").value = "";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline mr-1 mb-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Task
              </button>

              {/* <ul className="mt-3">
                {tasks.map((task, index) => (
                  <li key={index} className="mb-1">
                    <span className="mr-2">{task.task}</span>
                    <span className="text-sm text-gray-500">
                      {task.date.toDateString()}
                    </span>
                  </li>
                ))}
              </ul> */}
            </div>
          </form>
        </div>

        <ul className="space-y-4">
          {scheduleTasks.map((scheduleTask, index) => (
            <li key={index} className={`...`}>
              <div>
                <h4 className="text-md font-light">
                  {scheduleTask.task.title}
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  {scheduleTask.task.description} (Scheduled for:{" "}
                  {scheduleTask.date.toLocaleString()})
                </p>
              </div>
              {/* ... action buttons ... */}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">Your Tasks</h3>
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500">No tasks yet.</p>
            ) : (
              <ul className="space-y-4">
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    className={`p-4 rounded-lg shadow-md ${
                      lightTheme
                        ? "bg-white text-gray-800"
                        : "bg-gray-800 text-gray-200"
                    } transition transform hover:scale-105 hover:shadow-lg ${
                      index === editingIndex ? "border-2 border-blue-500" : ""
                    } 
        `}
                    // ${undoTask && undoTask === task ? "border-2 border-red-500" : ""}`}
                  >
                    {deletedTask && (
                      <div className="mt-4">
                        <button
                          className={`${
                            lightTheme
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-200"
                          } py-2 px-6 rounded-md text-sm font-semibold transform hover:scale-105 transition-all duration-300`}
                          onClick={() => {
                            setTasks([...tasks, deletedTask]); // Undoing the deletion
                            setDeletedTask(null); // Resetting the deletedTask state
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 inline mr-1 mb-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 12H4M8 6h8m0 12a8 8 0 100-16 8 8 0 000 16z"
                            />
                          </svg>
                          Undo Delete
                        </button>
                      </div>
                    )}

                    {index === editingIndex ? (
                      <div>
                        {/* Edit fields */}
                        <input
                          type="text"
                          value={editedTask.title}
                          onChange={(e) => {
                            setEditedTask({
                              ...editedTask,
                              title: e.target.value,
                            });
                            setIsTaskEdited(true); // Update isTaskEdited when input changes
                          }}
                          className={`${
                            lightTheme
                              ? "bg-gray-300 text-gray-800"
                              : "bg-gray-700 text-gray-300"
                          } rounded-lg px-4 py-2 w-full focus:outline-none focus:border-purple-400`}
                        />

                        <textarea
                          value={editedTask.description}
                          onChange={(e) => {
                            setEditedTask({
                              ...editedTask,
                              description: e.target.value,
                            });
                            setIsTaskEdited(true); // Update isTaskEdited when textarea changes
                          }}
                          className={`${
                            lightTheme
                              ? "bg-gray-300 text-gray-800"
                              : "bg-gray-700 text-gray-300"
                          } rounded-lg px-4 py-2 w-full focus:outline-none focus:border-purple-400 resize-none mt-4`}
                          rows="3"
                        ></textarea>

                        <div className="flex justify-center space-x-4 mt-4">
                          {categories.map((category) => (
                            <button
                              key={category}
                              className={`px-5 py-2 rounded-md text-sm ${
                                editedTask.category === category
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : lightTheme
                                  ? "bg-gray-300 text-gray-800 border-gray-300"
                                  : "bg-gray-800 text-gray-300 border-gray-500"
                              } hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-md transition-colors duration-300`}
                              onClick={() =>
                                setEditedTask({
                                  ...editedTask,
                                  category: category,
                                })
                              }
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                        <div className="flex justify-center space-x-4 mt-4">
                          <button
                            onClick={() => handleEditSave(index)}
                            className={`${
                              lightTheme
                                ? "bg-purple-500 text-white hover:bg-purple-600"
                                : "bg-gray-900 text-white hover:bg-gray-700 hover:text-gray-200"
                            } py-2 px-6 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300`}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className={`${
                              lightTheme
                                ? "bg-gray-900 text-white hover:bg-gray-700 hover:text-gray-200"
                                : "bg-gray-900 text-white hover:bg-gray-800"
                            } py-2 px-6 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <div onClick={() => handleStartEdit(index)}>
                            <h4 className="text-md font-light">{task.title}</h4>
                            <p className="mt-1 text-sm text-gray-600">
                              {task.description}
                              {isTaskEdited &&
                                index === editingIndex &&
                                " (edited)"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => startEditingTask(index)}
                            className={`${
                              lightTheme
                                ? "text-gray-600 hover:text-gray-800"
                                : "text-gray-400 hover:text-white"
                            } transition-colors duration-300`}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>

                          <button
                            onClick={() => handleDeleteTask(index)}
                            className={`${
                              lightTheme
                                ? "text-gray-600 hover:text-gray-800"
                                : "text-gray-400 hover:text-white"
                            } transition-colors duration-300`}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="mt-4">
                      <span className="text-xs font-semibold text-gray-300">
                        <FontAwesomeIcon icon={faFolder} className="mr-1" />
                        Category:{" "}
                        <span className="capitalize">{task.category}</span>
                      </span>
                    </div>
                    {/* {undoTask && undoTask === task && (
                      <div className="mt-4">
                        <button
                          className={`${
                            lightTheme
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-200"
                          } py-2 px-6 rounded-md text-sm font-semibold transform hover:scale-105 transition-all duration-300`}
                          onClick={() => {
                            setTasks([...tasks, undoTask]); // Undoing the deletion
                            setUndoTask(null); // Resetting the undoTask state
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 inline mr-1 mb-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 12H4M8 6h8m0 12a8 8 0 100-16 8 8 0 000 16z"
                            />
                          </svg>
                          Undo Delete
                        </button>
                      </div>
                    )} */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
