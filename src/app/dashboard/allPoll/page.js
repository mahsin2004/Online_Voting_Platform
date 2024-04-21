/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import AdminProtected from "@/Component/Protected/AdminProtected";
import useAuth from "@/app/hook/useAuth";

const allPoll = () => {
  const [allPoll, setAllPoll] = useState();
  const { id } = useParams();
  const { user } = useAuth();

  const { data, refetch } = useQuery({
    queryKey: ["create-poll"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/create-poll");
      setAllPoll(res?.data);
      return res?.data;
    },
  });

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
    <AdminProtected>
      <div className="mt-5 text-center mb-4">
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
          {allPoll?.map((poll, ind) => (
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
    </AdminProtected>
  );
};

export default allPoll;
