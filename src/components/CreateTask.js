import React, { useState } from "react";
import { useAuth } from "../context/AuthContextProvider";
// import Sidebar from "./Sidebar";
// import Body from "./Body";
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { createTask } from "../api/jounal-api";
import { useParams } from "react-router-dom";
const API_URL = "https://kitkat-journal.herokuapp.com";

function CreateTask() {
  const [task, setTask] = useState({
    name: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState([]);
  const [nameErrors, setNameErrors] = useState([]);
  const [dateErrors, setDateErrors] = useState([]);
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const { state } = useAuth();
  const params = useParams();
  //   const { dispatch } = useAuth();
  //   const handleLogout = (e) => {
  //     dispatch({
  //       type: "LOGOUT",
  //     });
  //   };

  const handleCreateTask = async (e) => {
    const { data, errors, status } = await createTask(
      state.token,
      task,
      params.id
    );

    console.log(errors);

    if (status === 401) {
      dispatch({ type: "LOGOUT" });
    } else if (Object.keys(errors).length > 0) {
      setNameErrors(errors.name);
      setDateErrors(errors.date);
      setTask({ name: "", description: "", date: "" });
      console.log(nameErrors);
      console.log(dateErrors);
    } else {
      navigate(`/dashboard/categories/${params.id}`, { replace: true });
    }
  };

  return (
    <div className="md:w-screen lg:w-screen text-xs md:text-base lg:text-base">
      <div className="flex justify-center mb-10 mt-5">
        <h1 className="text-2xl">Hello {state.user.email}</h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1>form</h1>

        <div className="w-4/5 flex flex-col items-center">
          <input
            className="mt-5 w-full h-10 px-1 bg-slate-800 text-white border-slate-600 border focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            type="name"
            placeholder="name"
            value={task.name}
            onChange={(e) =>
              setTask({
                ...task,
                name: e.target.value,
              })
            }
          />
          {nameErrors && nameErrors.map((err) => <p>{err}</p>)}
        </div>
        <div className="w-4/5 flex flex-col items-center">
          <input
            className="mt-5 w-full h-10 px-1 bg-slate-800 text-white border-slate-600 border focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            type="description"
            value={task.description}
            placeholder="description"
            onChange={(e) =>
              setTask({
                ...task,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="w-4/5 flex flex-col items-center">
          <input
            className="mt-5 w-full h-10 px-1 bg-slate-800 text-white border-slate-600 border focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            type="date"
            value={task.date}
            placeholder="date"
            onChange={(e) =>
              setTask({
                ...task,
                date: e.target.value,
              })
            }
          />
          {dateErrors && dateErrors.map((err) => <p>{err}</p>)}
        </div>
      </div>

      <div className="mt-10 mb-10 flex justify-center items-center">
        <button
          className="bg-green-500 px-20 py-2 w-5/6 font-bold rounded-lg hover:bg-green-700 hover:text-black transition-all"
          onClick={handleCreateTask}
        >
          Add Task
        </button>
      </div>

      <Link
        className="absolute bottom-5 left-5"
        to={`/dashboard/categories/${params.id}`}
      >
        Back
      </Link>
    </div>
  );
}

export default CreateTask;
