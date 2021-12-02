import React, { useReducer, useContext } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import Footer from "../Layout/Footer/Footer";
import { AuthContext } from "../App";

const flashReducer = (state, action) => {
  switch (action.type) {
    case "FLASH":
      return action.payload || false;
    case "RESET":
      return "";
    default:
      throw new Error("Reducer dispatch type not found");
  }
};

function SignIn({ setValue }) {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  const [flash, dispatch] = useReducer(flashReducer, "");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    dispatch({ type: "RESET" });
    if (username === "" || password === "") {
      dispatch({ type: "FLASH", payload: "Missing credentials" });
      return;
    }
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_LOCALHOST_PORT}/adminLogin`,
        {
          username,
          password,
        }
      );
      if (result.data.message) {
        dispatch({ type: "FLASH", payload: result.data.message });
      } else {
        setValue(result.data);
        navigate("../articles", { replace: true });
      }
    } catch (err) {
      dispatch({ type: "FLASH", payload: err.message });
    }
  };

  if (auth) {
    return <Navigate to="/articles" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full flex justify-between items-center">
        <h1 className="ml-4 text-xl text-secondary">Blog CMS</h1>
        <nav className="flex justify-end p-4">
          <span className="nav-link hover:text-secondary cursor-auto">
            Not an admin?
          </span>
          <a
            href={`${process.env.REACT_APP_PUBLIC_URL}`}
            to="/signin"
            className="highlight-button"
          >
            Go to the public site
          </a>
        </nav>
      </div>
      <div className="flex-grow grid place-items-center">
        <form
          onSubmit={(e) => formSubmitHandler(e)}
          className="flex flex-col w-10/12 md:w-1/3 bg-white p-4 border-0 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-bold text-primary text-center">
            Sign in
          </h1>
          <div className="mt-2 flex flex-col">
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              id="username"
              placeholder="Jane Doe"
              className="username-input"
            />
          </div>
          <div className="mt-2 flex flex-col">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="username-input"
            />
          </div>
          {/* Error Messages */}
          <div className="text-highlight my-2">
            <p className="empty:h-6">{flash}</p>
          </div>
          <input type="Submit" className="highlight-button mx-0" />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
