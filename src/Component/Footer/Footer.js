import React from "react";
import styles from "./Footer.module.css";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import dvsLogo from "../../../public/images/DVS_logo.png";

const Footer = () => {
  return (
    <>
      <footer className="pt-10 pb-6 bg-gray-900 border-t-2 border-gray-100/10 text-indigo-200/70">
        <div className="max-w-2xl mx-auto text-center opacity-95 px-3">
          <div className=" mx-auto mb-3">
            <section className="flex flex-col justify-center items-center text-center">
              <Image
                className="w-20"
                src={dvsLogo}
                alt="alt"
                width={200}
                height={200}
              />
              <p className="text-2xl font-medium text-white/70 mt-[2px]">
                Digital Voting System
              </p>
            </section>
          </div>
          <div className="">
            <p>
              An online voting system is a software platform that allows groups
              to securely conduct votes and elections.The system should verify
              the identity and eligibility of the voters and candidate, and
              prevent unauthorized or duplicate voting.
            </p>
          </div>
        </div>
      </footer>
      <footer className="px-3 pb-8 bg-gray-900 text-white">
        <div className="footer footer-center  max-w-4xl mx-auto">
          <p className="text-indigo-200/70">
            © 2024 Digital Voting System Platform(DVS). All Rights Reserved.
          </p>
          <div className="flex justify-center gap-3 -mt-4">
            <button className="text-gray-800 bg-white/80 rounded-full p-2 hover:text-white hover:bg-gray-800  transition">
              <FaFacebookF></FaFacebookF>
            </button>
            <button className="text-gray-800 bg-white/80 rounded-full p-2 hover:text-white hover:bg-gray-800 transition">
              <BsInstagram></BsInstagram>
            </button>
            <button className="text-gray-800 bg-white/80 rounded-full p-2 hover:text-white hover:bg-gray-800  transition">
              <BsTwitter></BsTwitter>
            </button>
            <button className="text-gray-800 bg-white/80 rounded-full p-2 hover:text-white hover:bg-gray-800  transition">
              <FaLinkedin></FaLinkedin>
            </button>
            <button className="text-gray-800 bg-white/80 rounded-full p-2 hover:text-white hover:bg-gray-800  transition">
              <BsYoutube></BsYoutube>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
