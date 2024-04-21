"use client";
import useAuth from "@/app/hook/useAuth";
import { FaRegCopy } from "react-icons/fa";
import img from "../../../assast/profile.png";
import { FaEdit } from "react-icons/fa";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const { user } = useAuth();
  const [users, setusers] = useState([]);
  // console.log(user?.email);
  const [allUser, setAlluser] = useState([]);
  const userData = `https://evs-delta.vercel.app/users`;
  useEffect(() => {
    fetch(userData)
      .then((res) => res.json())
      .then((data) => setAlluser(data));
  }, [userData]);
  console.log(allUser);

  const User = allUser?.filter((users) => users?.email == user?.email);
  console.log(User?.[0]?.idNumber);

  // update profile
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const date = form.date.value;
    const name = form.name.value;
    const alldata = { name, date };
    console.log(alldata);

    fetch(`http://evs-delta.vercel.app/users/${user?.email}`, {
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
  // console.log(users);

  return (
    <div className="">
      <div className="min-h-screen">
        <div className="bg-slate-500 w-full h-full  shadow-xl">
          <div className="flex justify-end text-4xl">
            <FaEdit
              onClick={() => document.getElementById("my_modal_3").showModal()}
            />
          </div>
          <h1 className="text-center font-bold text-xl text-black pt-8">
            Welcome to the {users?.isRole} Profile
          </h1>

          <div className="flex gap-5 items-center card-body ">
            <Image
              className="w-[150px] h-[150px] rounded-full border-4 border-red-200"
              src={user?.photoURL ? user?.photoURL : img}
              width={250}
              height={250}
              alt="profile"
            ></Image>
            <div className="flex gap-2 items-center">
              <p>{User?.[0]?.idNumber}</p> <FaRegCopy />
            </div>

            {user && (
              <h1 className="text-5xl text-white font-semibold">
                {user?.displayName}
              </h1>
            )}

            <hr />
            <div className="">
              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-xl font-bold">Full Name</h2>
                  {user && <p className="">{user?.displayName}</p>}
                </div>
                <div>
                  <h2 className="text-xl font-bold">Email</h2>

                  {user && <p className="  font-semibold">{user?.email}</p>}
                </div>
                <div>
                  <h2 className="text-xl font-bold">Date Of Birdth</h2>
                  <p className="">{User?.[0]?.date}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold">ID Number</h2>
                  <p>{User?.[0]?.idNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <>
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
                  <span className=" dark:text-white">Change Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Change Name"
                  className="input input-bordered text-white"
                  required
                  name="name"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className=" dark:text-white">Change Date of birth</span>
                </label>
                <input
                  type="date"
                  placeholder="Photo"
                  className="input input-bordered text-white"
                  required
                  name="date"
                />
              </div>
              <br />
              <button className="btn bg-primary-content w-full">Update</button>
            </form>
          </div>
        </dialog>
      </>
    </div>
  );
};

export default Page;
