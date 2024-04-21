"use client";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSupport } from "react-icons/bi";
import { BsCardText } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import {
  IoIosConstruct,
  IoIosCube,
  IoIosLogIn,
  IoMdHome,
  IoMdInformationCircle,
} from "react-icons/io";
import Notification from "../Notification/Notification";
import NavLink from "./NavLink/Navlink";
import dvsLogo from "../../../public/images/DVS_logo.png";

const Nav = () => {
  const { user, logOut } = useAuth();

  const [open, setOpen] = useState(false);
  const controls = useAnimation();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [users, setusers] = useState();
  const [showModal, setShowModal] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const res = await axios.get(
            `https://evs-delta.vercel.app/users/${user?.email}`,
            {
              withCredentials: true,
            }
          );
          setusers(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user?.email]);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 }); // Start animation after mounting
  }, [controls]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      const threshold = 78;

      if (isScrollingDown && currentScrollPos > threshold) {
        controls?.start({ opacity: 0, y: -50 });
      } else {
        controls?.start({ opacity: 1, y: 0 });
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, controls]);

  const handleLogOut = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  // const handleSupportClick = () => {
  //   setShowModal(true);
  // };

  const Links = [
    {
      id: 1,
      path: "/",
      title: "Home",
      icon: <IoMdHome />,
    },
    {
      id: 2,
      path: "/show-all-vote",
      title: "Elections",
      icon: <BsCardText />,
    },
    {
      id: 3,
      path: "/about",
      title: "About",
      icon: <IoMdInformationCircle />,
    },
    ...((user && users?.isRole == "user") ||
    (user && users?.isRole == "Modarator")
      ? [
          {
            id: 5,
            path: "/createvote",
            title: "Create Election",
            icon: <IoIosCube />,
          },
        ]
      : []),

    // ...(user && users?.isRole == "user" || user && users?.isRole == "Modarator"
    //   ? [
    //       {
    //         id: 6,
    //         path: "/adminHelp",
    //         title: "Support",
    //         icon: <BiSupport />,
    //         onClick: ()=>handleSupportClick(),
    //       },
    //     ]
    //   : []),

    ...(user
      ? []
      : [
          {
            id: 7,
            path: "/login",
            title: "Log In",
            icon: <IoIosLogIn />,
          },
        ]),
  ];

  const handleAdminFeedback = async (e) => {
    console.log(e.target);
    e.preventDefault();
    const form = e.target;
    const feedback = form?.feedback.value;
    const userName = user?.displayName;
    const email = user?.email;
    const adminFeedback = { feedback, userName, email };
    console.log(adminFeedback);

    axios
      .post("https://evs-delta.vercel.app/admin-feedback", adminFeedback)
      .then((res) => {
        console.log(res);
        withCredentials: true, router.push(`/admin-feedback/${userName}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const handleAdminFeedback = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const feedback = form?.feedback.value;
  //   const userName = user?.displayName;
  //   const email = user?.email;
  //   const adminFeedback = { feedback, userName, email };
  //   console.log(adminFeedback);

  //   try {
  //     const res = axios.post("https://evs-delta.vercel.app/admin-feedback", adminFeedback, {
  //       withCredentials: true
  //     });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 border-b-2 border-gray-100/10  bg-gray-900 shadow-lg`}
      animate={controls}
      initial={{ opacity: 0, y: -50 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-center">
        <motion.div
          className="flex items-center gap-14"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="font-bold  text-3xl flex items-center font-[Poppins] text-white/90"
          >
            <span className="text-3xl text-white/90 mr-2">
              <ion-icon name="logo-ionic"></ion-icon>
            </span>
            <Image
              className="w-16"
              src={dvsLogo}
              alt="alt"
              width={200}
              height={200}
            />
          </Link>

          <div className=" md:hidden text-white/90">
            {user && <Notification />}
          </div>
          <div className=" md:hidden">
            {user && (
              <div className="dropdown dropdown-end md:ml-2 ml-5">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className=" rounded-full border-[2px] border-gray-300">
                    {user && (
                      <Image
                        width={20}
                        height={20}
                        alt="User Profile"
                        src={user?.photoURL ? user?.photoURL : userProfile}
                      />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[100] p-4 shadow bg-white text-black rounded-box w-48 mt-4"
                >
                  <div className="">
                    {user && <p className="mb-3 ml-4">{user?.displayName}</p>}

                    <li>
                      <Link href="/dashboard/home">dashboard</Link>
                    </li>

                    <li>
                      <button onClick={handleLogOut}>Log Out</button>
                    </li>
                  </div>
                </ul>
              </div>
            )}
          </div>
          <div className="md:hidden ml-2">
            <motion.div
              onClick={() => setOpen(!open)}
              className="text-3xl cursor-pointer transition-transform duration-300 transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {open ? (
                <FiX onClick={closeMenu} className="text-2xl text-white/90" />
              ) : (
                <FiMenu className="text-2xl text-white/90" />
              )}
            </motion.div>
          </div>
        </motion.div>

        <ul
          className={`md:flex md:items-center md:space-x-6 md:pb-0 pb-3 ${
            open ? "block" : "hidden md:block"
          }`}
        >
          {Links.map((link) => (
            <motion.li
              key={link.name}
              className="md:my-0 my-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NavLink href={link.path} icon={link.icon} title={link.title} />
            </motion.li>
          ))}
          {/* {users?.isRole == "user" || users?.isRole == "Modarator" ? (
            <button onClick={() => handleSupportClick()} className="text-white">
              Support
            </button>
          ) : (
            []
          )} */}
          {user && (
            <motion.li
              className="mt-2 text-white/90 md:mt-0 md:ml-4 ml-8 hidden md:block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Notification classes="mt-2 md:mt-0 md:ml-4" />
            </motion.li>
          )}
          {user && (
            <div className="dropdown dropdown-end md:ml-2 ml-5  hidden md:block">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-[2px] border-white/90">
                  {user && (
                    <Image
                      width={40}
                      height={40}
                      alt="User Profile"
                      src={user?.photoURL ? user?.photoURL : userProfile}
                    />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[100] p-4 shadow bg-gray-700/95 text-white/90 rounded-box w-48 mt-4"
              >
                <div className="">
                  {user && <p className="mb-3 ml-4">{user?.displayName}</p>}

                  <li>
                    <Link href="/dashboard/home">dashboard</Link>
                  </li>

                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </div>
              </ul>
            </div>
          )}
        </ul>
      </div>
      {/* {showModal && (
        <div className="fixed inset-0 z-50 flex items-center text-white justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto">
            <button
              className="absolute -right-3 -top-5 text-white"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <form
              onSubmit={handleAdminFeedback}
              className="w-96 bg-gray-700 p-4 rounded-md"
            >
              <h3 className="font-bold text-lg mb-4">Hello!</h3>
              <textarea
                placeholder="Your Text"
                type="text"
                name="feedback"
                className="textarea textarea-bordered textarea-md w-full max-w-lg"
              ></textarea>
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-sm btn-primary">Send</button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </motion.nav>
  );
};

export default Nav;
