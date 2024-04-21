"use client";
import { FaRobot } from "react-icons/fa";
import Chat from "../chat/Chat";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import "../Bot.css";

const Toggle = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  return (
    <div>
      <div
        className={`transition-all ${
          show
            ? "transform translate-y-0 active"
            : "transform translate-y-full transition-all-out"
        }`}
      >
        {show ? <Chat /> : ""}
      </div>
      <div className="flex justify-end drop-shadow-2xl">
        {show ? (
          <IoClose
            onClick={handleHide}
            className="text-5xl text-white/95  bg-gradient-to-r from-indigo-400 to-indigo-500 p-2 rounded-full drop-shadow-2xl mt-3 animate-spin transform hover:scale-125"
            style={{ animation: "infinite" }}
          />
        ) : (
          <FaRobot
            onClick={handleShow}
            className="text-5xl text-white/95 bg-gradient-to-r from-indigo-400 to-indigo-500 p-2 rounded-full drop-shadow-2xl mt-3 animate-spin transition transform hover:scale-125"
            style={{ animation: "scaleAnimation 1.5s infinite" }}
          />
        )}
      </div>
    </div>
  );
};

export default Toggle;
