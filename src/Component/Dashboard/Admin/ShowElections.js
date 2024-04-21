"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdDelete, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "@/app/hook/useAuth";
import AdminProtected from "@/Component/Protected/AdminProtected";

const ShowElections = () => {
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const { data: elections = [], refetch } = useQuery({
    queryKey: ["elections1"],
    queryFn: async () => {
      const res = await axios.get(
        `https://evs-delta.vercel.app/create-vote?search=${search}`
      );
      return res.data;
    },
    refetchInterval: 50,
  });

  const Timer = ({ startDate1, endDate1 }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isSystemRunning, setSystemRunning] = useState(false);

    // Check if the system should start or stop
    useEffect(() => {
      const startDateTime = new Date(startDate1).getTime();
      const endDateTime = new Date(endDate1).getTime();

      if (
        currentTime.getTime() >= startDateTime &&
        currentTime.getTime() <= endDateTime
      ) {
        // Start the system
        setSystemRunning(true);
      } else {
        // Stop the system
        setSystemRunning(false);
      }
    }, [currentTime, startDate1, endDate1]);

    // Update the current time every second
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      // Cleanup function to clear the interval when the component is unmounted
      return () => clearInterval(timer);
    }, []);

    return (
      <div>
        <h2 className=" font-normal">
          <span className="text-xs lg:hidden">Status: </span>
          {isSystemRunning ? "Running" : "Stopped"}
        </h2>
      </div>
    );
  };

  // Delete Function Added
  const handleDelete = (id, electionName) => {
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
          `https://evs-delta.vercel.app/create-vote/${id}`
        );
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "deleted",
            text: `this Candidate has been deleted.`,
            icon: "success",
          });
          refetch();
          //under all candidate
          axios
            .delete(
              `https://evs-delta.vercel.app/candidate/under/${electionName}`
            )
            .then((res) => {
              console.log(res.data);
            });

          //under all users
          axios
            .delete(
              `https://evs-delta.vercel.app/candidate/under/users/${electionName}`
            )
            .then((res) => {
              console.log(res.data);
            });
        }
      }
    });
  };

  //Send Notification when Admin delete a election

  const handleNotification = (type, electionName, electionEmail) => {
    const notification = {
      senderEmail: user?.email,
      receiverEmail: electionEmail,
      type,
      electionName,
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

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    console.log(searchText);
    // refetch();
    setSearch(searchText);
  };

  return (
    <AdminProtected>
      <div className="mt-5">
        <div className="text-center pt-5 pb-6 text-white flex justify-center items-center">
          <form onSubmit={handleSearch}>
            <div className="flex items-center justify-end ">
              <div>
                <input
                  type="text"
                  id="id"
                  name="search"
                  placeholder="Search by Org. Name"
                  className="w-[220px] border border-slate-400 bg-blue-200/15 rounded-l-md py-2 px-5 outline-none	"
                />
              </div>
              <div className="rounded-r-md ">
                <button
                  type="submit"
                  value="Search"
                  className="px-2 w-[70px] border border-l-0 border-slate-400 rounded-r-md py-2 outline-none	bg-blue-200/15 hover:bg-slate-500 flex justify-center items-center"
                >
                  <MdSearch className="text-2xl text-indigo-200/100" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 text-indigo-200/100 font-semibold text-center mb-3">
            <p className="col-span-1">Number</p>
            <p className="col-span-4">Organization Name</p>
            <p className="col-span-3">Election Name</p>
            <p className="col-span-1">Status</p>
            <p className="col-span-2">Details</p>
            <p className="col-span-1">Action</p>
          </div>
        </div>
        <div className="grid mb-3">
          {elections?.map((election, index) => (
            <div
              key={election._id}
              className={`${
                index % 2 === 0
                  ? "bg-blue-200/5 text-indigo-200/70"
                  : "bg-blue-200/5 text-indigo-200/70"
              } text-center font-semibold border-b border-indigo-200/50`}
            >
              <div className=" space-y-1 lg:grid lg:grid-cols-12 py-3 lg:items-center lg:justify-center font-medium">
                <p className="col-span-1">{index + 1}</p>
                <p className="col-span-4">
                  <span className="text-xs lg:hidden">Organization Name: </span>
                  {election?.OrganizatonName}
                </p>
                <p className="col-span-3">
                  <span className="text-xs lg:hidden">Election Name: </span>

                  {election?.name}
                </p>
                <div className="col-span-1">
                  <Timer
                    startDate1={`${election?.startDate}T${election?.startTime}`}
                    endDate1={`${election?.endDate}T${election?.endTime}`}
                  />
                </div>
                <div className="col-span-2">
                  <Link href={`/dashboard/allElections/${election._id}`}>
                    <button className="border border-indigo-200/50 px-[10px] py-[6px] rounded-md hover:bg-white/80 hover:text-gray-800 ">
                      See Details
                    </button>
                  </Link>
                </div>
                <div className="col-span-1">
                  <button
                    onClick={() => {
                      handleNotification(1, election?.name, election?.email);
                      handleDelete(election._id, election?.name);
                    }}
                    className="bg-red-500 text-white px-4 py-[10px] rounded-md mr-2 "
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminProtected>
  );
};

export default ShowElections;
