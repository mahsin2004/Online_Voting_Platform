"use client"
import useAuth from "@/app/hook/useAuth";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const Protected = ({children}) => {
    const {user,loading} = useAuth();
    const router = useRouter()
    if(loading){
      return <Loading></Loading>
    }
    if(user){
      return <>{children}</>
    }
    return router.push("/login") 
};


export default Protected;