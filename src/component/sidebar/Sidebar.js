import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Varta from "./Varta.png";

export default function Sidebar({ sidebarState, setSidebarState }) {
  const [hovered, setHovered] = useState(true);

  const sidebarClass =
    sidebarState === true
      ? "screen h-full flex justify-center items-center shadow-sm bg-zinc-800 w-56"
      : "screen h-full flex justify-center items-center shadow-sm bg-zinc-800 w-0";

  const handdlesidebar = () => {
    setSidebarState(!sidebarState);
    console.log(sidebarState);
  };
  return (
    <>
      <aside className="fixed top-0 left-0 h-full">
        <nav className={`${sidebarClass} transition-width duration-300`}>
          <div>
            <button
              className="relative flex justify-center items-center pl-2"
              style={{
                transform: sidebarState
                  ? "translateX(125px)"
                  : "translateX(5px)",
                transition: "transform 300ms",
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handdlesidebar}
            >
              <div
                className={`bg-white rounded-lg ${
                  hovered ? "opacity-0" : "opacity-50"
                }`}
                style={{
                  width: "4px",
                  height: "25px",
                  fontWeight: "bold",
                  transition: "transform 300ms",
                }}
              ></div>

              <FontAwesomeIcon
                icon={faChevronLeft}
                className={`text-white opacity-50 w-4 ${
                  hovered ? "block" : "hidden"
                }`}
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  transform: sidebarState ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "transform 300ms",
                }}
              />
            </button>
          </div>
          <div
            className="fixed flex items-center  w-56 top-2 left-0 rounded-xl text-white h-12 cursor-default hover:bg-zinc-600"
            style={{
              transform: sidebarState ? "translateX(0)" : "translateX(-224px)",
              transition: "transform 300ms",
            }}
          >
            <img src={Varta} className="relative h-16 left-2 pr-5" alt="" />
            VARTA
          </div>
        </nav>
      </aside>
    </>
  );
}
