import NavLink from "@/Component/Navbar/NavLink/Navlink";
import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import styles from "../../Navbar/NavLink/Navlink.module.css";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";

const NavBarIcon = () => {
  const [userRoles, setUserRoles] = useState({});
  const { user } = useAuth();
  useEffect(() => {
    axios
      .get(`https://evs-delta.vercel.app/users/${user?.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUserRoles(res.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [user]);
  const Links = [
    {
      id: 1,
      path: "/dashboard/home",
      title: "Dashboard",
    },
    ...(userRoles?.isRole === "user"
      ? [
          {
            id: 7,
            path: "/dashboard/myPoll",
            title: "My Polls",
          },
        ]
      : []),
    ...(userRoles?.isRole === "Modarator"
      ? [
          {
            id: 2,
            path: "/dashboard/ownElections",
            title: "My Elections",
          },
          {
            id: 7,
            path: "/dashboard/myPoll",
            title: "My Polls",
          },
        ]
      : []),
    ...(userRoles?.isRole === "Admin"
      ? [
          {
            id: 3,
            path: "/dashboard/allElections",
            title: "Elections",
          },
          // {
          //   id: 7,
          //   path: "/dashboard/Candidate",
          //   title: "All Candidate",
          // },
          {
            id: 5,
            path: "/dashboard/allPoll",
            title: "Polls",
          },
          {
            id: 8,
            path: "/dashboard/showMessage",
            title: "Feedbacks",
          },
          {
            id: 4,
            path: "/dashboard/allVoter",
            title: "Users",
          },
        ]
      : []),
    {
      id: 6,
      path: "/",
      title: "Home",
    },
  ];

  const [open, setopen] = useState(false);

  return (
    <div className="text-center">
      <button
        className={`styles.menu text-2xl text-gray-600 p-1 bg-white/90 rounded-full`}
        onClick={() => setopen((prev) => !prev)}
      >
        {open ? <RxCross2 /> : <HiMenu />}
      </button>
      {open && (
        <div className={`styles.mobileDevice my-2 `}>
          {Links.map((link) => (
            <NavLink key={link.id} href={link.path} title={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBarIcon;
