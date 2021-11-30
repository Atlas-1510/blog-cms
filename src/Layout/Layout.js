import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router";

function Layout({ clearValue }) {
  return (
    <div className="flex flex-col min-h-screen font-roboto bg-blueGray-100">
      <Header clearValue={clearValue} />
      <div className="flex-grow flex flex-col items-center min-w-[360px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
