"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { MdDeleteForever, MdVerified } from "react-icons/md";
import ReactPaginate from "react-paginate";
import "./styles.css";
import { useQuery } from "@tanstack/react-query";
import AdminProtected from "@/Component/Protected/AdminProtected";
import Swal from "sweetalert2";

const AllVoter = () => {
  const [voters, setVoters] = useState([]);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/users", {
        withCredentials: true,
        params: { page: currentPage, limit },
      });
      setVoters(res.data);
      setPageCount(res.data.pageCount);
      return res.data;
    },
  });

  useEffect(() => {
    getPaginatedUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const changeLimit = () => {
    setCurrentPage(1);
    getPaginatedUsers();
  };

  const getPaginatedUsers = async () => {
    try {
      const response = await axios.get(
        `https://evs-delta.vercel.app/paginatedUsers?page=${currentPage}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );

      setPageCount(response.data.pageCount);
      setVoters(response.data.result);
    } catch (error) {
      console.error("Error fetching paginated users:", error);
    }
  };

  // const handleVerify = async (id) => {
  //   try {
  //     const res = await axios.patch(
  //       `https://evs-delta.vercel.app/users/verify/${id}`
  //     );
  //     if (res.data.modifiedCount > 0) {
  //       refetch();
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleRole = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want make admin this user",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I do!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.patch(
            `https://evs-delta.vercel.app/users/isRole/${id}`
          );
          if (res.data.modifiedCount > 0) {
            setVoters((prevVoters) =>
              prevVoters.map((voter) =>
                voter._id === id ? { ...voter, isRole: "admin" } : voter
              )
            );
            Swal.fire({
              title: "Admin",
              text: "This voter has been Admin.",
              icon: "success",
            });
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
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
          `https://evs-delta.vercel.app/users/${id}`
        );

        if (res.data.deletedCount > 0) {
          setVoters((prevVotes) => prevVotes.filter((vote) => vote._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "This voter has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <AdminProtected>
      <div>
        <div className="mt-5">
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 text-center text-indigo-200/100 font-semibold text-base  border-b-2 border-indigo-200/50 py-3">
              <p className="col-span-1">Number</p>

              <p className="col-span-2">Name</p>
              <p className="col-span-3">ID Card Number</p>
              <p className="col-span-3">Email</p>
              <p className="col-span-2">Role</p>
              {/* <th>Verify</th> */}
              <p className="col-span-1">Action</p>
            </div>
          </div>
          <div>
            {voters?.map((vote, index) => (
              <div
                key={vote._id}
                className={`${
                  index % 2 === 0
                    ? "bg-blue-200/5 text-indigo-200/70"
                    : "bg-blue-200/5 text-indigo-200/70"
                } text-center font-semibold border-b border-indigo-200/50 space-y-1 lg:grid grid-cols-12 py-3 justify-center items-center`}
              >
                <p className="col-span-1">
                  {(currentPage - 1) * limit + index + 1}
                </p>

                <p className="col-span-2">{vote.name}</p>
                <p className="col-span-3">{vote.idNumber}</p>
                <p className="col-span-3">{vote.email}</p>
                <div className="col-span-2">
                  <button
                    className=" bg-blue-200/15 text-indigo-200/60 px-2 py-1 mt-1 rounded"
                    onClick={() => handleRole(vote._id)}
                  >
                    {vote.isRole}
                  </button>
                </div>
                {/* <td>
                    <button onClick={() => handleVerify(vote._id)}>
                      {vote?.verify == "true" ? (
                        <MdVerified className="text-3xl text-green-600 text-center ml-5 cursor-pointer" />
                      ) : (
                        <ImCross className="text-xl text-red-700 text-center ml-5 cursor-pointer" />
                      )}
                    </button>
                  </td> */}
                <div className="text-3xl cursor-pointer col-span-1">
                  <button onClick={() => handleDelete(vote._id)}>
                    <MdDeleteForever className=" text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {
          <div className="md:flex items-center justify-between mt-4">
            <ReactPaginate
              breakLabel={<span className="break-label">...</span>}
              nextLabel={<span className="pagination-icon">&rarr;</span>}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={<span className="pagination-icon">&larr;</span>}
              renderOnZeroPageCount={null}
              marginPagesDisplayed={2}
              containerClassName="pagination-container"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              forcePage={currentPage - 1}
            />
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">
                Page {currentPage} of {pageCount}
              </span>
              <input
                className="p-2 border border-gray-400 rounded-md"
                placeholder="Limit"
                onChange={(e) => setLimit(e.target.value)}
              />
              <button
                className="ml-2 bg-blue-500 text-white md:px-4 px-2 md:py-2 py-1 rounded-md"
                onClick={changeLimit}
              >
                Set Limit
              </button>
            </div>
          </div>
        }
      </div>
    </AdminProtected>
  );
};

export default AllVoter;
