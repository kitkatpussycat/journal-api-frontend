import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { deleteTask, getTask, toggleCompleteTask } from "../api/jounal-api";
import { useParams } from "react-router-dom";

function ShowTask() {
  const { dispatch } = useAuth();
  const { state } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const [categoryId, setCategoryId] = useState(undefined);

  useEffect(() => {
    (async () => {
      const { data, status } = await getTask(state.token, params.id);
      console.log("data from showCategory", data);
      console.log("name", task.name);
      console.log("description", task.description);
      console.log("date", task.date);

      if (status === 401) {
        dispatch({ type: "LOGOUT" });
      } else if (status === 404) {
        navigate(`/dashboard`, { replace: true });
      } else {
        setTask(data);
        setCategoryId(data.category_id);
      }
    })();
  }, [params.id]);

  const handleDelete = async () => {
    const status = await deleteTask(state.token, params.id);
    if (status === 401) {
      dispatch({ type: "LOGOUT" });
    } else if (status === 404) {
      navigate(`/dashboard/categories/${params.id}`, { replace: true });
    } else {
      navigate(`/dashboard/categories/${categoryId}`, { replace: true });
    }
  };

  const handleCompleted = async () => {
    const { data, status } = await toggleCompleteTask(
      state.token,
      params.id,
      task.completed
    );
    console.log("nagrurun ba?");
    if (status === 401) {
      dispatch({ type: "LOGOUT" });
    } else if (status === 404) {
      navigate(`/dashboard/categories/${params.id}`, { replace: true });
    } else {
      setTask(data);
      console.log(task);
    }
  };

  return (
    <div>
      <div className="m-5 bg-slate-700 p-1">
        <div className="m-5">
          <strong>{task.name}</strong>
        </div>
        <div className="m-5">
          Description: <br />
          {task.description}
        </div>
        <div className="m-5">
          Date: <br />
          {task.date}
        </div>
        <div className="m-5">
          Status: <br />
          {task.completed ? "completed" : "ongoing"}
        </div>
      </div>

      <div className="flex flex-row justify-center items-center">
        <button
          className="text-md lg:text-xl font-bold btn-medium m-1 hover:bg-blue-900 py-1 px-2 rounded-xl"
          onClick={handleDelete}
        >
          delete
        </button>

        <button className="text-md lg:text-xl font-bold btn-medium m-1 hover:bg-blue-900 py-1 px-2 rounded-xl">
          <Link
            to={`/dashboard/categories/${categoryId}/task/${params.id}/edit`}
          >
            Edit
          </Link>
        </button>

        <button
          className="text-md lg:text-xl font-bold btn-medium m-1 hover:bg-blue-900 py-1 px-2 rounded-xl"
          onClick={handleCompleted}
        >
          completed
        </button>
      </div>

      <Link
        className="absolute bottom-5 left-5"
        to={`/dashboard/categories/${categoryId}`}
      >
        Back
      </Link>
    </div>
  );
}

export default ShowTask;
