import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="ml-4 text-xl text-secondary">Blog CMS</h1>
      <nav className="flex justify-end p-4">
        <NavLink
          end
          to="/articles"
          className={({ isActive }) =>
            isActive ? "active-nav-link" : "nav-link"
          }
        >
          Home
        </NavLink>
        <NavLink to="/signin" className="nav-link">
          Sign in
        </NavLink>
        <NavLink to="/signup" className="highlight-button">
          Sign up
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
