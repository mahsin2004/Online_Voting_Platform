import { FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { GrLogin } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAdmin from "../../../Hooks/useAdmin";
import { logOut } from "../../../Features/Utilities";
import { logoutUser } from "../../../Features/UserSlice";
import { SlLogout } from "react-icons/sl";

const SubNav = () => {
  const user = useSelector((state) => state.data.user.user);

  const dispatch = useDispatch();
  const [isAdmin] = useAdmin();
  // console.log(isAdmin);
  
    const handleLogout = () => {
    logOut()
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((error) => {
        console.log(error.massage);
      });
  };
  return (
    <div className="bg-[#0B4534] text-white text-sm px-4 flex flex-col lg:flex-row justify-between md:px-10 lg:px-20 py-2">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 ">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex justify-center items-center gap-2">
            <FaPhoneAlt className="" />
            <p className="">Cell: +880 2873846</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <MdEmail className="" />
            <p className="">Email: hello@gmail.com</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <p className="flex justify-center items-center gap-2">
            Follow Us : <FaXTwitter />
            <CiFacebook />
            <FaInstagram />
            <CiLinkedin />{" "}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {/* <GrLogin /> */}
        {user ? (
          <button
            onClick={handleLogout}
            className="flex justify-center items-center gap-2 text-sm font-medium px-4 py-2 duration-200 transform bg-first text-white hover:bg-transparent hover:text-first rounded hover:-translate-y-[2px] transition-all ease-in hover:scale-100"
          >
            <SlLogout />
            Logout
          </button>
        ) : (
          <Link to={`/login`}>
            <button className="flex justify-center items-center gap-2 text-sm font-medium px-4 py-2 duration-200 transform bg-first text-white hover:bg-transparent hover:text-first rounded hover:-translate-y-[2px] transition-all ease-in hover:scale-100">
              <GrLogin />
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};