"use client";
import useAuth from "@/app/hook/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import Swal from "sweetalert2";
import registrationImg from "../../../public/images/DVS_logo.png";
import { UploadImage } from "@/Component/shareComponent/utilites";

const Registration = () => {
  const { createUser, updateUserProfile } = useAuth();
  const router = useRouter();
  const [Error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const image = form.photo.files[0];
    const date = form.date.value;
    const verify = false;
    const isRole = "user";
    
    const imageData =await UploadImage(image);
    const photo = imageData?.data?.display_url;
    const user = { name, email, confirmPassword, photo, date, verify, isRole };

   
    // console.log(user);
    // Password validation
    if(password != confirmPassword){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title:
          "Password not same",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }
    
    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*()_+{}[\]:;<>,/.?~\\]/.test(password)
    ) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title:
          "Password should be 6 characters or more and contain at least one capital letter and one special character.",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    

    setloading(true);

    try {
      // Create user
      await createUser(email, password);

      // Update user profile
      await updateUserProfile(name, photo);

      // Send user data to backend
      await fetch("https://evs-delta.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // Show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful",
        showConfirmButton: false,
        timer: 2000,
      });

      // Reset form
      form.reset();
      router.replace("/");
      // Reload page and redirect
      // window.location.reload();
      // Replace with the desired redirect path
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage =
        error.message || "An error occurred during registration.";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="bg-slate-900 flex items-center justify-center min-h-screen text-white px-3">
      <div className="w-full lg:max-w-[600px] mx-auto lg:p-6">

        <div className="flex text-gray-700 dark:text-white  flex-col justify-center items-center">
          <Image className="w-20 pt-4" width={200} height={200} alt="login Img" src={registrationImg} />

          <div className="mt-2 mb-7 text-center">
            <h1 className="mb-2 text-3xl font-bold text-white ">
              Create a free account
            </h1>
            <h4 className="text-base">
              <span className="opacity-75">Or </span>
              <span className="text-blue-500">log in to your account</span>
            </h4>
          </div>
        </div>
        <div className="lg:px-8 lg:pt-4 lg:pb-6 ] border- border-t-4 rounded-xl shadow-md bg-gray-800 border-blue-700">
          <form onSubmit={handleRegistration} className="w-full p-3">
            <div className="grid lg:grid-cols-12 gap-4">
              <div className="form-control col-span-6">
                <label className="label">
                  <span className=" text-white">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="input input-bordered bg-[#1D232A] text-white"
                  required
                  name="name"
                />
              </div>
              <div className="form-control col-span-6">
                <label className="label">
                  <span className=" text-white">E-mail</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your E-mail"
                  className="input input-bordered bg-[#1D232A] text-white"
                  required
                  name="email"
                />
              </div>
              <div className="relative col-span-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">
                      Password
                    </span>
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered bg-[#1D232A] text-white"
                    required
                    defaultChecked
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
              <div className="form-control col-span-6">
                
              <div className="relative col-span-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">
                      Confirm Password
                    </span>
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter your password"
                    className="input input-bordered bg-[#1D232A] text-white"
                    required
                    defaultChecked
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
              </div>

              <div className="form-control col-span-6 text-white">
                {/* file photo */}
                <div className="form-control">
                  <label className="label">
                    <span className=" text-white">Upload Photo</span>
                  </label>
                  <input
                    required
                    name="photo"
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs bg-[#1D232A] text-white"
                  />
                </div>
              </div>

              <div className="form-control col-span-6">
                <label className="label">
                  <span className=" text-white">
                    Birth of Date
                  </span>
                </label>
                <input
                  type="date"
                  placeholder="Photo"
                  className="input input-bordered bg-[#1D232A] text-white"
                  required
                  name="date"
                />
              </div>
            </div>
            {Error && <p className="">{Error.message}</p>}
            <div className="flex justify-between items-center mt-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                  checked
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="label-text ml-3 text-base">
                    I agree to the
                     <span className="text-[#3B82F6] cursor-pointer"> privacy policy </span> 
                     and <span className="text-[#3B82F6] cursor-pointer">
                      terms of service
                    </span>
                    .
                  </span>
                </label>
              </div>
            </div>
            <div className="form-control mt-5">
              <button
                type="submit"
                className=" py-3 px-4 rounded-md border border-transparent font-semibold bg-blue-500 text-white"
              >
                {loading ? (
                  <h1 className="loading loading-spinner loading-sm"></h1>
                ) : (
                  "Registration"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="flex text-white flex-col justify-center items-center">
          <div className="mt-7 mb-4 text-center">
            <h4 className="text-base">
              <span className="opacity-90">Don't have an account yet?</span>{" "}
              <Link href="/login">
                <span className="text-blue-500 cursor-pointer">Login</span>
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

export default Registration;
