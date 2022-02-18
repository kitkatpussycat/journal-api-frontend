import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { getAllTasks, deleteCategory, getTask } from "../api/jounal-api";
import { useParams } from "react-router-dom";

function ShowAllTask() {
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

  //   const renderAllTasks = () => {
  //     let today = new Date();
  //     return tasks.map((task) => {
  //       {
  //         return task;
  //       }
  //     });
  //   };
  return (
    <div>
      <div>All task</div>

      <div>
        {tasks &&
          tasks.map((task) => (
            <button
              className={`${
                task.completed ? "bg-green-500" : "bg-blue-500"
              } text-md lg:text-xl font-bold hover:bg-blue-900 py-1 px-2 rounded-xl m-1`}
              key={task.id}
              onClick={() => showTask(task.category_id, task.id)}
            >
              {task.name}
            </button>
          ))}
      </div>
      <Link to={`/dashboard`}>Back</Link>
    </div>
  );
}

export default ShowAllTask;