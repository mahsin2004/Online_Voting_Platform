"use client";
import { MdEdit, MdOutlineChat, MdSearch } from "react-icons/md";
import useAuth from "@/app/hook/useAuth";
import Image from "next/image";
import Notification from "@/Component/Notification/Notification";
import { useEffect, useState } from "react";
import "./DashboardNavbar.css";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const DashboardNavbar = () => {
  const { user } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const [users, setusers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // user in the mongodb not firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const res = await axios.get(
            `https://evs-delta.vercel.app/users/${user?.email}`,
            { withCredentials: true }
          );
          setusers(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user?.email]);

  // update profile
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const date = form.date.value;
    const name = form.name.value;
    const alldata = { name, date };
    console.log(alldata);

    fetch(`https://evs-delta.vercel.app/users/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(alldata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal("Thank You", "Update Successfully", "success");
        }
      });
  };

  const handleSupportClick = () => {
    setShowModal(true);
  };

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
        // console.log(res);
        // router.push(`/admin-feedback/${userName}`);
        console.log('data-',res?.data?.acknowledged)
        if (res?.data?.acknowledged == true) {
          setShowModal(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Your message sent',
            showConfirmButton: false,
            timer: 1000,
          });
        }else{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'There is a Problem',
            showConfirmButton: false,
            timer: 1000,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="text-white/90 flex justify-center lg:justify-end items-center relative">
        {/* <div className="hidden lg:block p-2 bg-blue-200/15  rounded-md">
          <div className="flex items-center justify-around">
            <input
              type="text"
              className="bg-transparent px-1.5 mx-2"
              placeholder="Search..."
            />
            <button className="hover:bg-blue-200/30">
              {" "}
              <MdSearch className="text-lg text-white/90/65" />
            </button>
          </div>
        </div> */}
        <div></div>
        <div className="flex items-center gap-4 bg-blue-200/15 p-1.5 px-6 rounded-md">
          {/* <MdOutlineChat size={25} className="text-white"/>
           */}
          {users?.isRole == "user" || users?.isRole == "Modarator" ? (
            <button onClick={() => handleSupportClick()} className="text-white">
              Support
            </button>
          ) : (
            []
          )}

          <Notification />
          <Image
            onClick={() => {
              setOpenProfile(!openProfile);
            }}
            className=" rounded-full h-[30px] w-[30px] object-cover cursor-pointer"
            height={30}
            width={30}
            src={user?.photoURL}
            alt="Profile Photo"
          />
          <div
            className={`dropdown-menus shadow-xl z-20 border border-gray-800 ${
              openProfile ? "active" : "inactive"
            } h-auto`}
          >
            <ul>
              <div className="flex justify-end text-xl cursor-pointer">
                <MdEdit
                  className=""
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                />
              </div>
              <div className="grid gap-4 items-center h-auto">
                <h1 className=" font-bold text-lg mb-2">
                  Welcome Back !! <br />{" "}
                  <span className="text-2xl">{users.isRole} Dashboard</span>
                </h1>
                <div className="w-24 h-24">
                  <Image
                    className="w-full h-full rounded-full object-cover"
                    height={100}
                    width={100}
                    src={user?.photoURL}
                    alt="Profile Photo"
                  />
                </div>
                <div className="flex gap-1 items-center">
                  <p>{users?.idNumber}</p> <FaRegCopy />
                </div>
                {user && (
                  <h1 className="text-2xl text-white/90 font-semibold">
                    {user?.displayName}
                  </h1>
                )}
                <hr />
                <div className="">
                  <div className="grid gap-6">
                    <div>
                      <h2 className="text-lg font-bold">Full Name</h2>
                      {user && <p className="">{user?.displayName}</p>}
                    </div>
                    <div>
                      <h2 className="font-bold">Email</h2>

                      {user && <p className="font-semibold">{user?.email}</p>}
                    </div>
                    <div>
                      <h2 className="font-bold">Date Of Birdth</h2>
                      <p className="">{users?.date}</p>
                    </div>
                  </div>
                </div>
              </div>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-slate-500 ">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg text-center">
                    Update your profile
                  </h3>
                  <form onSubmit={handleUpdate} action="">
                    <div className="form-control">
                      <label className="label">
                        <span className=" dark:text-white/90">Change Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Change Name"
                        className="input input-bordered text-white/90"
                        required
                        name="name"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className=" dark:text-white/90">
                          Change Date of birth
                        </span>
                      </label>
                      <input
                        type="date"
                        placeholder="Photo"
                        className="input input-bordered text-white/90"
                        required
                        name="date"
                      />
                    </div>
                    <br />
                    <button className="btn bg-primary-content w-full">
                      Update
                    </button>
                  </form>
                </div>
              </dialog>
            </ul>
          </div>
        </div>
        {showModal && (
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
                <h3 className="font-bold text-lg mb-4">Send your message on admin!</h3>
                <textarea
                  placeholder="Your Text"
                  type="text"
                  required
                  name="feedback"
                  className="textarea textarea-bordered textarea-md w-full max-w-lg"
                ></textarea>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-sm btn-primary">Send</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardNavbar;
