import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { getAllTasks, deleteCategory, getTask } from "../api/jounal-api";
import { useParams } from "react-router-dom";

function ShowTodayTask() {
  const { dispatch } = useAuth();
  const { state } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, status } = await getAllTasks(state.token);
      if (status === 401) {
        dispatch({ type: "LOGOUT" });
      } else {
        setTasks(data);
        console.log(tasks);
      }
    })();
  }, []);

  const showTask = (category_id, id) => {
    navigate(`/dashboard/categories/${category_id}/task/${id}`, {
      replace: true,
    });
  };

  const renderDueTasks = () => {
    let today = new Date();
    return tasks.filter((task) => {
      return today.toISOString().split("T")[0] === task.date;
    });
  };

  return (
    <div>
      <div className="flex justify-center mb-10 mt-2">
        <h1 className="text-2xl">Today's task</h1>
      </div>

      <div className="flex flex-row justify-end m-5">
        <div className="bg-blue-500 w-fit px-2 m-1">ongoing</div>
        <div className="bg-green-500 w-fit px-2 m-1">completed</div>
      </div>

      <div className="flex flex-col m-5 h-96 border-2 border-white rounded-xl overflow-y-auto overflow-x-hidden">
        {renderDueTasks() &&
          renderDueTasks().map((task) => (
            <button
              className={`${
                task.completed ? "bg-green-500" : "bg-blue-500"
              } text-md lg:text-xl font-bold hover:bg-blue-900 py-3 px-2 rounded-xl m-1`}
              key={task.id}
              onClick={() => showTask(task.category_id, task.id)}
            >
              {task.name}
            </button>
          ))}
      </div>
      <Link className="absolute bottom-5 left-5" to={`/dashboard`}>
        Back
      </Link>
    </div>
  );
}

export default ShowTodayTask;
