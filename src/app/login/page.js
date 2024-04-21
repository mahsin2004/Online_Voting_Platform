/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { auth } from "@/app/firebase/config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import Swal from "sweetalert2";
import loginImg from "../../../public/images/DVS_logo.png"

const page = () => {
  //firebase
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [loading, setloading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  console.log({ user });

  const handleLogin = async (event) => {
    event.preventDefault();
    const from = event.target;
    const email = from.email.value;
    const password = from.password.value;

    setloading(true);

    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      if (res) {
        from.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Enail & Password Wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-slate-900 flex items-center px-3 justify-center min-h-screen text-white">
      <div className="w-full lg:max-w-[520px] mx-auto lg:p-6">

        <div className="flex dark:text-white flex-col justify-center items-center">
          <Image className="w-20" width={200} height={200} alt="login Img" src={loginImg} />

          <div className=" mt-2 mb-7 text-center">
            <h1 className="mb-2 text-white text-3xl font-bold">
              Log in to your account
            </h1>
            <h4 className="text-base">
              <span className="opacity-75">Or</span>{" "}
              <span className="text-blue-500">create a free account</span>
            </h4>
          </div>
        </div>
        <div className="lg:p-8 lg:pb-10 border- border-t-4 rounded-xl shadow-md bg-gray-800 border-blue-700">
          <form onSubmit={handleLogin} className=" w-full px-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your E-Mail"
                className="input input-bordered bg-[#1D232A] text-white"
                required
              />
            </div>
            <div className="relative">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password"
                  className="input input-bordered bg-[#1D232A] text-white"
                  required
                />
              </div>
              <div className="absolute -mt-[42px] right-0 flex items-center pr-3">
                <p
                  onClick={() => setShowPass(!showPass)}
                  className="p-2 focus:outline-none"
                >
                  {showPass ? (
                    <PiEyeLight className="h-5 w-5 text-white" />
                  ) : (
                    <PiEyeSlash className="h-5 w-5 text-white" />
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="label-text ml-3 text-base">Remember me</span>
                </label>
              </div>
              <div>
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt text-base text-[#4F46E5] link link-hover cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
            </div>
            <div className="form-control mx-auto mt-5">
              <button
                type="submit"
                className="py-3 px-4 rounded-md border border-transparent font-semibold bg-blue-500 text-white"
              >
                {loading ? (
                  <p className="loading loading-spinner loading-sm" />
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="flex text-white flex-col justify-center items-center">
          <div className="mt-7 mb-4 text-center">
            <h4 className="text-base">
              <span className="opacity-90">Don't have an account yet?</span>
              <Link href="/registration">
                <span className="text-blue-500 cursor-pointer">
                  Registration
                </span>
              </Link>
            </h4>
          </div>
          <div className="opacity-70">
            <ul className="flex gap-6 items-center justify-center text-white ">
              <Link href="/">
                <li>Home</li>
              </Link>
              <li>Contact</li>
              <li>Terms</li>
              <li>Imprint</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
