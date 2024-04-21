"use client";
import { useEffect, useState } from "react";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AdminProtected from "@/Component/Protected/AdminProtected";

const Page = () => {
  const { data: candidates = [], refetch } = useQuery({
    queryKey: ["candidates45"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/candidate", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const handledeleted = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to fire this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deleted it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `https://evs-delta.vercel.app/candidate/${id}`
        );
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "fire!",
            text: `this Candidate has been deleted.`,
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  return (
    <AdminProtected>
      <div>
        <div className="mt-5 mb-4">
          {/* head */}

          <div className="hidden lg:block">
            <dev className=" grid grid-cols-12 text-center text-indigo-200/100 font-semibold text-base  border-b-2 border-indigo-200/50 py-3">
              <p className="col-span-1">Number</p>
              <p className="col-span-3">Candidate</p>
              <p className="col-span-4">ID Card Number</p>
              <p className="col-span-3">Brand</p>
              <p className="col-span-1">Action</p>
            </dev>
          </div>

          <dev className="">
            {/* map candidates to rows */}
            {candidates.map((candidate, index) => (
              <div
                key={candidate.id}
                className={`${
                  index % 2 === 0
                    ? "bg-blue-200/5 text-indigo-200/70"
                    : "bg-blue-200/5 text-indigo-200/70"
                } text-center font-semibold border-b border-indigo-200/50 space-y-1 lg:grid grid-cols-12 py-3 justify-center items-center`}
              >
                <p className="col-span-1 font-semibold text-center">
                  {index + 1}
                </p>

                <div className="col-span-3">
                  <p className="font-bold"><span className="text-xs lg:hidden">Candidate Name: </span>{candidate.candidateName}</p>
                </div>
                <p className="col-span-4"><span className="text-xs lg:hidden">Candidate Id: </span>{candidate.candidateID}</p>
                <p className="col-span-3"><span className="text-xs lg:hidden">Brand Name: </span>{candidate.brand}</p>
                <div className="col-span-1 text-3xl cursor-pointer">
                  <button onClick={() => handledeleted(candidate._id)}>
                    <MdDelete className=" text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </dev>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
