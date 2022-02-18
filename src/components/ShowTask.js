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
      <div className="m-5 bg-slate-700">
        <div className="m-5">
          <strong>{task.name}</strong>
        </div>
        <div>{task.description}</div>
        <div>{task.date}</div>
        <div>{task.completed ? "completed" : "ongoing"}</div>
      </div>

      <div>
        <button
          className="bg-green-500 px-20 py-2 w-1/3 font-bold rounded-lg hover:bg-green-700 hover:text-black transition-all"
          onClick={handleDelete}
        >
          delete
        </button>

        <button className="bg-green-500 px-20 py-2 w-1/3 font-bold rounded-lg hover:bg-green-700 hover:text-black transition-all">
          <Link
            to={`/dashboard/categories/${categoryId}/task/${params.id}/edit`}
          >
            Edit
          </Link>
        </button>

        <button
          className="bg-green-500 px-20 py-2 w-1/3 font-bold rounded-lg hover:bg-green-700 hover:text-black transition-all"
          onClick={handleCompleted}
        >
          completed
        </button>
      </div>

      <Link to={`/dashboard/categories/${categoryId}`}>Back</Link>
    </div>
  );
}

export default ShowTask;
