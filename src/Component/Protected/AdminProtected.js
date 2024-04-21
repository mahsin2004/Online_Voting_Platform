"use client";
import React, { useState } from "react";
import useAuth from "@/app/hook/useAuth";
import Loading from "@/app/loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const AdminProtected = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [allUsers, setAllUser] = useState(true);
  console.log(user?.email);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["poll-ans"],
    queryFn: async () => {
      const res = await axios.get(
        `https://evs-delta.vercel.app/users/${user?.email}`,{
          withCredentials: true,
        }
      );
      setAllUser(res?.data);
      return res?.data;
    },
  });

  console.log(allUsers);
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (allUsers !== true && allUsers?.isRole === "Admin") {
    return <>{children}</>;
  }
  if (allUsers !== true && allUsers?.isRole !== "Admin") {
    router.replace("/login");
    return null;
  }
};

export default AdminProtected;
