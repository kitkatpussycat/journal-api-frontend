import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { getCategory, deleteCategory, getTask } from "../api/jounal-api";
import { useParams } from "react-router-dom";

function PerCategory() {
  const { dispatch } = useAuth();
  const { state } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, status } = await getCategory(state.token, params.id);
      console.log("data from perCategory", data);
      console.log("name", category.name);
      console.log("description", category.description);

      if (status === 401) {
        dispatch({ type: "LOGOUT" });
      } else if (status === 404) {
        navigate("/dashboard", { replace: true });
      } else {
        setCategory(data);
      }
    })();
  }, [params.id]);

  const handleDelete = async () => {
    const status = await deleteCategory(state.token, params.id);
    if (status === 401) {
      dispatch({ type: "LOGOUT" });
    } else if (status === 404) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  //   useEffect(() => {
  //     (async () => {
  //       const { data, status } = await getTask(state.token, tasks.id);
  //       if (status === 401) {
  //         dispatch({ type: "LOGOUT" });
  //       } else {
  //         setTasks(data);
  //         console.log(tasks);
  //       }
  //     })();
  //   }, []);

  const showTask = (id) => {
    navigate(`task/${id}`, { replace: true });
  };

  return (
    <div>
      <div className="m-5 bg-slate-700">
        <div className="m-2 mt-5">
          <strong>{category.name}</strong>
        </div>
        <div className="m-2">
          Description:
          <br />
          {category.description}
        </div>

        <div className="flex flex-row justify-end">
          <div>
            <button
              className="text-md lg:text-xl font-bold btn-medium m-1 hover:bg-blue-900 py-1 px-2 rounded-sm"
              onClick={handleDelete}
            >
              delete
            </button>
          </div>

          <div>
            <button className="text-md lg:text-xl font-bold btn-medium m-1 hover:bg-blue-900 py-1 px-2 rounded-sm">
              <Link to={`/dashboard/categories/${category.id}/edit`}>edit</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="m-5">
        <div>
          <button className="text-md lg:text-xl font-bold btn-medium m-1 hover:bg-blue-900 py-1 px-2 rounded-xl">
            <Link to={`/dashboard/categories/${category.id}/addTask`}>
              Add Task
            </Link>
          </button>
        </div>
      </div>

      <div className="m-5 flex flex-col border-2 border-white h-96 rounded-xl overflow-y-auto overflow-x-hidden">
        {category.tasks &&
          category.tasks.map((task) => (
            <button
              className={`${
                task.completed ? "bg-green-500" : "bg-blue-500"
              } text-md lg:text-xl font-bold hover:bg-blue-900 py-1 px-2 rounded-xl m-1`}
              key={task.id}
              onClick={() => showTask(task.id)}
            >
              {task.name}
            </button>
          ))}

        <Link className="absolute bottom-5 left-5" to={`/dashboard`}>
          Back
        </Link>
      </div>
    </div>
  );
}

export default PerCategory;
