import React from "react";
import { IconContext } from "react-icons";
import { SiGithub } from "react-icons/si";

function Footer() {
  return (
    <div className="flex justify-center items-center h-[10vh] bg-blueGray-50">
      <IconContext.Provider value={{ size: "2.5rem", color: "#9CA3AF" }}>
        <a href="https://github.com/Atlas-1510/blog-cms">
          <SiGithub />
        </a>
      </IconContext.Provider>
    </div>
  );
}

export default Footer;
