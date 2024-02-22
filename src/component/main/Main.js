import React from "react";
import Varta from "./Varta.png";

export default function Main({ sidebarState, query }) {
  return (
    <div
      className="fixed flex flex-col items-center text-white h-full right-0"
      style={{
        zIndex: "-12",
        width: sidebarState ? "calc(100vw - 224px)" : "100vw",
        transition: "width 300ms",
        visibility: query.length > 0 ? "hidden" : "visible",
      }}
    >
      <img src={Varta} alt="" className=" relative w-40 top-1/4 opacity-85" />
      <div className="relative text-4xl opacity-40 top-1/4">
        Hello It's Varta
      </div>
    </div>
  );
}
