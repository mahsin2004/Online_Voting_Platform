"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { GiVote } from "react-icons/gi";
import { MdAddBox } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import Link from "next/link";

const Features = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="mb-[74px] max-w-7xl mx-auto">
      <div className="flex items-center gap-8"></div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div
          className="flex flex-col justify-center items-center bg-blue-200/5 border-2 border-gray-400/20 text-indigo-200/70 dark:text-indigo-200/70 py-12 lg:rounded-md"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <p className="text-3xl font-bold mb-3">Organize voting</p>
          <MdAddBox className="text-[50px]" />
        </div>

        <div
          className="flex flex-col justify-center items-center bg-blue-200/5 border-2 border-gray-400/20 text-indigo-200/70 dark:text-indigo-200/70 py-12 lg:rounded-md"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <p className="text-3xl font-bold mb-[7px]">Live voting</p>
          <GiVote className="text-[55px]" />
        </div>

        <div
          className="flex flex-col justify-center items-center bg-blue-200/5 border-2 border-gray-400/20 text-indigo-200/70 dark:text-indigo-200/70 py-12 lg:rounded-md"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <p className="text-3xl font-bold mb-4">Voting histories</p>
          <FaHistory className="text-[45px]" />
        </div>
      </div>
    </div>
  );
};

export default Features;
