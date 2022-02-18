import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./context/AuthContextProvider";
import ProtectedRoute from "./context/ProtectedRoute";
import Category from "./components/Category";
import PerCategory from "./components/PerCategory";
import EditCategory from "./components/EditCategory";
import CreateTask from "./components/CreateTask";
import ShowTask from "./components/ShowTask";
import EditTask from "./components/EditTask";
import ShowAllTask from "./components/ShowAllTask";
import ShowTodayTask from "./components/ShowTodayTask";
// import BodyDirectMessage from "./components/BodyDirectMessage";
// import Sidebar from "./components/Sidebar";

function App() {
  const { state } = useAuth();
  let redirectRoute;
  if (state.token) {
    redirectRoute = <Navigate replace to="dashboard" />;
  } else {
    redirectRoute = <Login />;
  }
  console.log("login", state.token);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={redirectRoute} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* <Route path="body/:id" element={<Body />} />
            <Route
              path="bodydirectmessage/:id"
              element={<BodyDirectMessage />}
            /> */}

            {/* <Route path="sidebar" element={<Sidebar />}></Route> */}
          </Route>
          <Route
            path="dashboard/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/categories/:id"
            element={
              <ProtectedRoute>
                <PerCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/categories/:id/edit"
            element={
              <ProtectedRoute>
                <EditCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/categories/:id/addTask"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/categories/:id/task/:id"
            element={
              <ProtectedRoute>
                <ShowTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/categories/:id/task/:id/edit"
            element={
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            }
          />

          <Route
            path="dashboard/allTasks"
            element={
              <ProtectedRoute>
                <ShowAllTask />
              </ProtectedRoute>
            }
          />

          <Route
            path="dashboard/TodayTasks"
            element={
              <ProtectedRoute>
                <ShowTodayTask />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
