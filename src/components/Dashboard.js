import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
// import Sidebar from "./Sidebar";
// import Body from "./Body";
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../api/jounal-api";

function Dashboard() {
  const { dispatch } = useAuth();
  const handleLogout = (e) => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const { state } = useAuth();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, status } = await getCategories(state.token);
      if (status === 401) {
        dispatch({ type: "LOGOUT" });
      } else {
        setCategories(data);
        console.log(categories);
      }
    })();
  }, []);

  const showCategory = (id) => {
    navigate(`categories/${id}`, { replace: true });
  };

  return (
    <div className="md:w-screen lg:w-screen text-xs md:text-base lg:text-base">
      <div className="flex justify-center mb-10 mt-5">
        <h1 className="text-2xl">Hello {state.user.email}</h1>
      </div>

      <div className="flex justify-center m-5">
        <button className="text-md lg:text-xl font-bold btn-medium m-1 hover:bg-blue-900 py-1 px-2 rounded-xl">
          <Link to={`/dashboard/allTasks`}>See all Tasks</Link>
        </button>
        <button className="text-md lg:text-xl font-bold btn-medium m-1 hover:bg-blue-900 py-1 px-2 rounded-xl">
          <Link to={`/dashboard/TodayTasks`}>See Todays's Tasks</Link>
        </button>
      </div>

      <div className="m-5">
        <button className="text-md lg:text-xl font-bold btn-medium hover:bg-blue-900 py-1 px-2 rounded-xl">
          <Link to={`/dashboard/category`}> + Category</Link>
        </button>
      </div>

      <div className="m-5 flex flex-col overflow-y-auto overflow-x-hidden border-2 border-white rounded-lg h-96 items-center p-5">
        {categories &&
          categories.map((category) => (
            <button
              className="text-md lg:text-xl font-bold btn-medium w-full hover:bg-blue-900 py-5 px-2 rounded-xl m-1"
              key={category.id}
              onClick={() => showCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
      </div>

      <div className="rounded-lg absolute bottom-5 left-5">
        <button
          className="text-md lg:text-xl font-bold btn-medium hover:bg-blue-900 py-2 px-2 rounded-xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
