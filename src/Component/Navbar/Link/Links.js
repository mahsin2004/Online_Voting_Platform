"use client";
import { useEffect, useState } from "react";
import NavLink from "../NavLink/Navlink";
import styles from "./Link.module.css";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import useAuth from "@/app/hook/useAuth";
import { IoIosCube } from "react-icons/io";
import axios from "axios";

const Links = () => {
  const [users, setusers] = useState();
  const { user } = useAuth();
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

  const Links = [
    {
      id: 1,
      path: "/",
      title: "Home",
    },
    {
      id: 2,
      path: "/show-all-vote",
      title: "Elections",
    },
    {
      id: 3,
      path: "/about",
      title: "About",
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
    ...(user
      ? []
      : [
          {
            id: 6,
            path: "/login",
            title: "Log In",
          },
        ]),
  ];
  const [open, setopen] = useState(false);

  return (
    <div>
      <div className={styles.link}>
        {Links.map((item) => (
          <NavLink item={item} key={item.id}></NavLink>
        ))}
      </div>
      <button className={styles.menu} onClick={() => setopen((prev) => !prev)}>
        {open ? <RxCross2 /> : <FaBars />}
      </button>
      {open && (
        <div className={styles.mobileDevice}>
          {Links.map((item) => (
            <NavLink item={item} key={item.id}></NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
