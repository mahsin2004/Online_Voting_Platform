"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import useAuth from "@/app/hook/useAuth";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ModaProtected = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [allUsers, setAllUser] = useState(true);
  console.log(user?.email);

  const { data, refetch } = useQuery({
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
  if (loading) {
    return <Loading></Loading>;
  }
  if (allUsers !== true && allUsers?.isRole === "Modarator") {
    return <>{children}</>;
  }
  if (allUsers !== true && allUsers?.isRole !== "Modarator") {
    return router?.push("/login");
  }
};

export default ModaProtected;
