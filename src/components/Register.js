import React, { useState } from "react";
import { register } from "../api/jounal-api";
import { Link } from "react-router-dom";

const API_URL = "https://kitkat-journal.herokuapp.com";

function Register() {
  const [registerAccount, setRegisterAccount] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [flash, setFlash] = useState("");

  const handleRegister = async (e) => {
    if (registerAccount.password !== registerAccount.confirmPassword) {
      setPassError("password Not Matched");
      setRegisterAccount({ email: "", password: "", confirmPassword: "" });
    } else {
      e.preventDefault();
      setLoading(true);
      const [data, errors] = await register(
        registerAccount.email,
        registerAccount.password
      );
      if (Object.keys(errors).length > 0) {
        setEmailErrors(errors.email);
        setPasswordErrors(errors.password);
        setRegisterAccount({ email: "", password: "", confirmPassword: "" });
      } else {
        setFlash("Successful register");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {/* <div> */}
      {loading ? (
        <p>Loading ....</p>
      ) : (
        <div className="w-screen h-screen lg:w-1/5 lg:h-1/2 relative">
          <div className="entry-card h-full w-full rounded-lg flex flex-col items-center py-20">
            <div className="mb-5">
              <h1 className="text-5xl font-bold">Journal-App</h1>
            </div>
            <div className="w-4/5 flex flex-col items-center">
              <input
                className="mt-5 w-full h-10 px-1 bg-slate-800 text-white border-slate-600 border focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                type="email"
                placeholder="email"
                value={registerAccount.email}
                onChange={(e) =>
                  setRegisterAccount({
                    ...registerAccount,
                    email: e.target.value,
                  })
                }
              />
              {emailErrors && emailErrors.map((err) => <p>{err}</p>)}
            </div>
            <div className="w-4/5 flex flex-col items-center">
              <input
                className="mt-5 w-full h-10 px-1 bg-slate-800 text-white border-slate-600 border focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                type="password"
                value={registerAccount.password}
                placeholder="password"
                onChange={(e) =>
                  setRegisterAccount({
                    ...registerAccount,
                    password: e.target.value,
                  })
                }
              />
              {passwordErrors && passwordErrors.map((err) => <p>{err}</p>)}
            </div>
            <div className="w-4/5 flex flex-col items-center">
              <input
                className="mt-5 w-full h-10 px-1 bg-slate-800 text-white border-slate-600 border focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                type="password"
                placeholder="confirm password"
                value={registerAccount.confirmPassword}
                onChange={(e) =>
                  setRegisterAccount({
                    ...registerAccount,
                    confirmPassword: e.target.value,
                  })
                }
              />
              {passError && <p>{passError}</p>}
            </div>
            <div className="mt-10 mb-10">
              <button
                className="bg-green-500 px-20 py-2 w-full font-bold rounded-lg hover:bg-green-700 hover:text-black transition-all"
                onClick={handleRegister}
              >
                Sign up
              </button>
            </div>
            <div className="absolute bottom-0 w-full text-center hover:bg-blue-900 font-semibold">
              {/* {error.length > 0 ? alert({ error }) : alert({ flash })} */}
              {flash && <p>{flash}</p>}
              <span>Back to </span>
              <Link className="text-white hover:text-blue-400" to="/">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* {error.length ? error.map((err) => <p>{err}</p>) : null}
      {flash && <p>{flash}</p>}
      <Link to="/">Login</Link> */}
      {/* </div> */}
    </div>
  );
}

export default Register;
