import React from "react";

export default function Navbar({ sidebarState }) {
  return (
    <div
      className="fixed right-0 h-14 z-10 w-full"
      style={{
        backgroundColor: "rgb(24, 23, 23)",
        width: sidebarState ? "calc(100vw - 230px)" : "100vw",
        transition: "width 300ms",
      }}
    ></div>
  );
}
