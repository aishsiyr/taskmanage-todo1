import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faCheck,
  faPause,
  faPlay,
  faCaretDown,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import Categories from "./categories";
import Filter from "./filter";

function formatDate(dateStr) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

function Task({ task, onDelete, onUpdateStatus}) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [status, setStatus] = useState(task.status);
  const [displayStatus, setDisplayStatus] = useState(task.status);
  const [taskDescription, setTaskDescription] = useState(task.description);

  useEffect(() => {
    // Update displayStatus when status changes
    setDisplayStatus(status);
  }, [status]);

  const handleUpdate = () => {
    onUpdateStatus(task.id,status);
    setEditing(false);
  };
  
  

  const getStatusColorClass = () => {
    const statusColors = {
      done: "text-lime-400",
      pause: "text-red-400",
      ongoing: "text-blue-400",
    };

    return statusColors[status] || "";
  };

  return (
    <div className="p-7">
           <Filter/>
      <div className="flex items-center justify-between border-b py-2">
        <Categories />
    
        <div>
          {editing ? (
            <div>
              <input
                type="text"
                onChange={(e) => setEditedText(e.target.value)}
              />
             <form onSubmit={handleUpdate}>
{taskDescription}
</form>

              <button className="text-pink-300" onClick={handleUpdate}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <p
                className={`${getStatusColorClass()}`}
                onClick={() => setEditing(true)}
              >
                {editedText} {/* Use editedText here */}
              </p>
              <p className={`${getStatusColorClass()}`} onClick={() => setEditing(true)}>
  {taskDescription}
</p>


              <p className="text-gray-500 text-xs">
                Created on {formatDate(task.createdOn)}
              </p>
            </div>
          )}
          <p
            className={`${
              displayStatus === "done"
                ? "text-lime-400"
                : displayStatus === "ongoing"
                ? "text-orange-400"
                : displayStatus === "pending"
                ? "text-red-400"
                : ""
            }`}
            onClick={() => setEditing(true)}
          >
            {displayStatus}
          </p>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-600" onClick={() => onDelete(task.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          {task.status !== "done" && (
            <button className="text-gray-600" onClick={() => setStatus("done")}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
          )}
          {task.status !== "pause" && (
            <button className="text-gray-600" onClick={() => setStatus("pause")}>
              <FontAwesomeIcon icon={faPause} />
            </button>
          )}
          {task.status === "pause" && (
            <button className="text-gray-600" onClick={() => setStatus("resume")}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
          <div className="flex items-center">
            <button className="text-gray-600" onClick={() => setEditing(true)}>
              Status <FontAwesomeIcon icon={faCaretDown} />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`text-gray-800 ${editing ? "block" : "hidden"}`}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
