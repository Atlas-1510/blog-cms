import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router";

function Layout({ clearValue }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header clearValue={clearValue} />
      <div className="flex-grow flex">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
