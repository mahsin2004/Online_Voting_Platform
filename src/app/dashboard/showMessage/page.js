"use client";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AdminProtected from "@/Component/Protected/AdminProtected";

const ShowFeedback = () => {
  const { data: candidates = [], refetch } = useQuery({
    queryKey: ["candidates45"],
    queryFn: async () => {
      const res = await axios.get(
        "https://evs-delta.vercel.app/admin-feedback",
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });
  console.log(candidates);

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
          `https://evs-delta.vercel.app/admin-feedback/${id}`
        );
        if (res?.data?.deletedCount > 0) {
          Swal.fire({
            title: "fire!",
            text: `this message has been deleted.`,
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
        <div className="mt-5 text-indigo-200/100">
          <div className="overflow-x-auto">
            {/* head */}
            <div className="hidden lg:block">
              <div
                className="grid grid-cols-12 text-center text-indigo-200/100
                  font-semibold text-base border-b-2 border-indigo-200/50 py-3"
              >
                <p className=" col-span-1">No</p>
                <p className=" col-span-3">Name</p>
                <p className="col-span-3">Email</p>
                <p className="col-span-4">Massage</p>
                <p className="col-span-1">Action</p>
              </div>
            </div>

            <div>
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
                  <p className=" font-semibold text-center col-span-1">
                    {index + 1}
                  </p>
                  <p className="font-bold col-span-3">{candidate.userName}</p>
                  <p className="col-span-3">{candidate.email}</p>
                  <p className="col-span-4">{candidate.feedback}</p>
                  <div className="text-3xl cursor-pointer col-span-1">
                    <button onClick={() => handledeleted(candidate._id)}>
                      <MdDeleteForever className=" text-red-700" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default ShowFeedback;
