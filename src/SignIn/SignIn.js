import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

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

function SignIn() {
  const [flash, dispatch] = useReducer(flashReducer, "");
  const { setValue } = useLocalStorage("jwt", null);

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
      const result = await axios.post("http://localhost:1015/login", {
        username,
        password,
      });
      if (result.data.message) {
        dispatch({ type: "FLASH", payload: result.data.message });
      } else {
        setValue(result.data);
        window.location.href = "http://localhost:3000/articles";
      }
    } catch (err) {
      dispatch({ type: "FLASH", payload: err.message });
    }
  };

  return (
    <div className="w-full flex-grow grid place-items-center ">
      <form
        onSubmit={(e) => formSubmitHandler(e)}
        className="flex flex-col w-10/12 md:w-1/3 bg-white p-4 border-0 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-primary text-center">Sign in</h1>
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
  );
}

export default SignIn;
