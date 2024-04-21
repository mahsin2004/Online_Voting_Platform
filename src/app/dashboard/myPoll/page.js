/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import useAuth from "@/app/hook/useAuth";
import ModaProtected from "@/Component/Protected/ModaProtected";
import Protected from "@/Component/Protected/Protected";

const page = () => {
  const { user } = useAuth();
  // console.log(user?.email);
  const [allPoll, setAllPoll] = useState();
  const { data, refetch } = useQuery({
    queryKey: ["create-poll"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/create-poll");
      setAllPoll(res?.data);
      return res?.data;
    },
  });
  // console.log(allPoll);
  const filterMyPoll = allPoll?.filter(
    (myPoll) => myPoll?.wonerEmail == user?.email
  );
  console.log(filterMyPoll);

  const handleDelete = async (id, receiverEmail, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `https://evs-delta.vercel.app/create-poll/${id}`
        );
        if (res.data.deletedCount > 0) {
          setAllPoll((prevPoll) => prevPoll.filter((vote) => vote._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "This voter has been deleted.",
            icon: "success",
          });
        }
      }
    });

    const type = 6;
    const notification = {
      senderEmail: user?.email,
      receiverEmail: receiverEmail,
      type,
      electionName: title,
    };

    axios
      .post("https://evs-delta.vercel.app/notification", notification)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <Protected>
      <div className="mt-5">
        {/* head */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 text-center text-indigo-200/100 font-semibold text-base  border-b-2 border-indigo-200/50 py-3">
            <p className="col-span-1">Number</p>
            <p className="col-span-5">Title</p>
            <p className="col-span-4">Owner</p>
            <p className="col-span-1">View</p>
            <p className="col-span-1">Delete</p>
          </div>
        </div>
        <div>
          {filterMyPoll?.map((poll, ind) => (
            <div
              key={poll?._id}
              className={`${
                ind % 2 === 0
                  ? "bg-blue-200/5 text-indigo-200/70"
                  : "bg-blue-200/5 text-indigo-200/70"
              } text-center font-semibold border-b border-indigo-200/50 space-y-1 lg:grid grid-cols-12 py-3 justify-center items-center`}
            >
              <p className="col-span-1">{ind + 1}</p>
              <p className="col-span-5">{poll?.title}</p>
              <p className="col-span-4">{poll?.wonerEmail}</p>
              <div className="col-span-1">
                <Link href={`/poll-participate/${poll?.userName}`}>Show</Link>
              </div>
              <div className="col-span-1">
                <button
                  onClick={() =>
                    handleDelete(poll?._id, poll?.wonerEmail, poll?.title)
                  }
                  className=" text-red-500 text-2xl"
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Protected>
  );
};

export default page;
