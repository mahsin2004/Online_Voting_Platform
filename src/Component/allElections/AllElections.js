"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../Modal/Modal";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


const AllElections = () => {
  const [search, setSearch] = useState("");

  const { data: showAllVote = [], refetch } = useQuery({
    queryKey: ["showAllElectons"],
    queryFn: async () => {
      const res = await axios.get(
        `https://evs-delta.vercel.app/create-vote?search=${search}`
      );
      return res.data;
    },
    refetchInterval: 50,
  });
  console.log(showAllVote);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    console.log(searchText);
    // refetch();
    setSearch(searchText);
  };

  return (
    <>
    <div className="pt-8 pb-14">
    <div className="text-center pt-4  pb-8 flex justify-center items-center">
        <form onSubmit={handleSearch}>
          <div className="flex items-center justify-end">
            <div>
              <input
                type="text"
                id="id"
                name="search"
                placeholder="Search by Org. Name"
                className="w-[220px] border border-slate-400 rounded-l-lg py-3 px-5 outline-none	bg-transparent"
              />
            </div>
            <div className="rounded-r-lg">
              <input type="submit" value="Search" className="bg-zinc-600 px-2 w-[85px] border border-l-0 border-slate-400 rounded-r-lg py-3 outline-none	bg-transparent hover:bg-slate-500" />
            </div>
          </div>
        </form>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 md:px-6 px-4 ">
        {showAllVote?.map((allVote, ind) => (
          <div key={allVote._id} className="h-full">
            <div className=" text-white/80 rounded-md drop-shadow-xl hover:shadow-2xl bg-blue-200/5 border-2  border-gray-100/20 p-5 h-full">
              <div className="flex justify-center items-center">
                <div className="pb-1 text-center">
                  <h2 className="text-3xl font-bold text-center mb-2">
                    <span className="text-base font-normal">
                      Organization Name
                    </span>
                    <br /> {allVote?.OrganizatonName}
                    <div className="mx-auto"></div>
                  </h2>
                  <div className="text-center">
                    <p className="font-bold text-2xl -mt-[5px]">
                      <span className="text-base font-normal">
                        Election Name
                      </span>
                      <br /> {allVote?.name}
                    </p>
                  </div>
                  {/* <Timer
                    startDate1={`${allVote?.startDate}T${allVote?.startTime}`}
                    endDate1={`${allVote?.endDate}T${allVote?.endTime}`}
                  /> */}
                  {(allVote?.isFinished != true) ?
                  <div className="">
                  <h2 className="text-green-500 font-semibold">
                    {allVote?.position == true && "Running"}
                  </h2>
                  <h2 className="text-yellow-400 font-semibold">
                    {allVote?.position != true && "Running soon"}
                  </h2>
                </div>
                :
                <div className="text-red-500 font-semibold">
                  Finished
                </div>
                  }
                  
                </div>
              </div>
              <div className="flex justify-center items-center text-center mt-2">
                <Link href={`/details/${allVote?.name}`} className=" w-3/6">
                  <button className="text-[16px] border  border-gray-100/20 py-[9px] rounded-md hover:bg-white/80 hover:text-gray-800 w-full">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AllElections;
