"use client";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { GiVote } from "react-icons/gi";
import Protected from "@/Component/Protected/Protected";
import { useQuery } from "@tanstack/react-query";
import Rechart from "@/Component/Dashboard/Rechart/Rechart";

const HomePage = () => {
  const { data: candidates = [], refetch } = useQuery({
    queryKey: ["candidates478"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/candidate", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users8974"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/users", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const { data: allElections = [] } = useQuery({
    queryKey: ["elections8974"],
    queryFn: async () => {
      const res = await axios.get('https://evs-delta.vercel.app/create-vote?search');
      return res.data;
    },
  });

  const { data: polls = [] } = useQuery({
    queryKey: ["polls8974"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/create-poll");
      return res.data;
    },
  });

  const data = [
    { name: "Users", value: users.length },
    { name: "Elections", value: allElections.length },
    { name: "Candidates", value: candidates.length },
    { name: "Polls", value: polls.length },
  ];

  return (
    <Protected>
      <div className="text-white">
        <div className="w-full justify-items-center"> 
          <div className=" w-full">
            <div className="grid lg:grid-cols-3 w-full rounded-none mt-6">
              <div className="stat lg:border-b lg:border-r lg:border-indigo-200/40 lg:col-span-1 bg-blue-200/5">
                <div className="stat-figure text-indigo-200/50 lg:border-indigo-200/50 ">
                  <FaUsers className="inline-block w-8 h-8 stroke-current" />
                </div>
                <div className="stat-title">Total Users</div>
                <div className="stat-value text-indigo-200/50 lg:border-indigo-200/50 ">
                  {users.length}
                </div>
              </div>
              <div className="stat lg:border-b lg:border-r lg:border-indigo-200/40 lg:col-span-1 bg-blue-200/5">
                <div className="stat-figure text-indigo-200/50 lg:border-indigo-200/50 ">
                  <GiVote className="inline-block w-8 h-8 stroke-current" />
                </div>
                <div className="stat-title">Total Elections</div>
                <div className="stat-value text-indigo-200/50 lg:border-indigo-200/50 ">
                  {allElections.length}
                </div>
              </div>
              <div className="stat lg:border-b lg:border-indigo-200/40 lg:col-span-1 bg-blue-200/5">
                <div className="stat-figure text-indigo-200/50 lg:border-indigo-200/50 ">
                  <FaUsers className="inline-block w-8 h-8 stroke-current" />
                </div>
                <div className="stat-title">Total Candidate</div>
                <div className="stat-value text-indigo-200/50 lg:border-indigo-200/50 ">
                  {candidates.length}
                </div>
              </div>
              <div className="stat lg:border-b lg:border-r lg:border-indigo-200/40 lg:col-span-1 bg-blue-200/5">
                <div className="stat-figure text-indigo-200/50 lg:border-indigo-200/50 ">
                  <GiVote className="inline-block w-8 h-8 stroke-current" />
                </div>
                <div className="stat-title">Total Polls</div>
                <div className="stat-value text-indigo-200/50 lg:border-indigo-200/50 ">
                  {candidates.length}
                </div>
              </div>
            </div>
            {/* chart  */}
            <div className="mt-6 mb-6">
              <Rechart data={data} />
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default HomePage;
