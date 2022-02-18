import React, { useState } from "react";
import { useAuth } from "../context/AuthContextProvider";
// import Sidebar from "./Sidebar";
// import Body from "./Body";
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { createCategory } from "../api/jounal-api";
const API_URL = "https://kitkat-journal.herokuapp.com";

function Category() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState([]);
  const [nameErrors, setNameErrors] = useState([]);
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  //   const { dispatch } = useAuth();
  //   const handleLogout = (e) => {
  //     dispatch({
  //       type: "LOGOUT",
  //     });
  //   };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const { data, errors, status } = await createCategory(
      state.token,
      category,
      state.user
    );

    if (status === 401) {
      dispatch({ type: "LOGOUT" });
    } else if (Object.keys(errors).length > 0) {
      setNameErrors(errors.name);
      setCategory({ name: "", description: "" });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  const { state } = useAuth();

  return (
    <div className="md:w-screen lg:w-screen text-xs md:text-base lg:text-base">
      <div className="flex justify-center mb-10 mt-5">
        <h1 className="text-2xl">Hello {state.user.email}</h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl">Add Category</h1>

        <div className="w-4/5 flex flex-col items-center">
          <input
            className="mt-5 w-full h-10 px-1 bg-slate-800 text-white border-slate-600 border focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            type="name"
            placeholder="name"
            value={category.name}
            onChange={(e) =>
              setCategory({
                ...category,
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
            value={category.description}
            placeholder="description"
            onChange={(e) =>
              setCategory({
                ...category,
                description: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="mt-10 mb-10 flex justify-center items-center">
        <button
          className="bg-green-500 px-20 py-2 w-5/6 font-bold rounded-lg hover:bg-green-700 hover:text-black transition-all"
          onClick={handleCreateCategory}
        >
          Create Category
        </button>
      </div>

      <Link className="absolute bottom-5 left-5" to={`/dashboard`}>
        Back
      </Link>
    </div>
  );
}
export default Category;
