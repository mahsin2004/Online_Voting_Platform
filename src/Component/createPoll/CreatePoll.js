/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Protected from "../Protected/Protected";
import { UploadImage } from "../shareComponent/utilites";
import Swal from "sweetalert2";

const createPoll = () => {
  const { user } = useAuth();
  const wonerEmail = user?.email;
  const router = useRouter();

  console.log(wonerEmail);
  const handleCreatePoll = async (e) => {
    console.log(e.target);
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const userName = form.userName.value;
    const description = form.description.value;
    const image = form.photo.files[0];
    const imageData = await UploadImage(image);
    const photo = imageData?.data?.display_url;
    // const photo = form.photo.value;
    const createPoll = { title, userName, description, photo, wonerEmail };
    console.log(createPoll);

    axios
      .post("https://evs-delta.vercel.app/create-poll", createPoll)
      .then((res) => {
        console.log(res);
        router.push(`/createpoll/${userName}`);
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title:
            "Username must be unique.",
          showConfirmButton: false,
          timer: 2000,
        });
      });

    const type = 5;
    const electionName = title;
    const notification = {
      senderEmail: user?.email,
      receiverEmail: user?.email,
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

  return (
    <Protected>
      <div className="dark:text-white">
        <div className="my-10 dark:text-white">
          <div>
            <div className="w-full lg:max-w-[500px] mx-auto lg:p-6">
              <form onSubmit={handleCreatePoll}>
                <div className="p-5 bg-slate-300 border-gray-200  lg:rounded-xl shadow-2xl dark:bg-gray-800 dark:border-gray-700">
                  <div className="">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-control col-span-2">
                        <label className="label">
                          <span className="label-text dark:text-white">
                            Title
                          </span>
                        </label>

                        <input
                          type="text"
                          required
                          placeholder="Type your question"
                          className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                          name="title"
                        />
                      </div>

                      <div className="form-control col-span-1">
                        <label className="label">
                          <span className="label-text dark:text-white">
                            User Name
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Name"
                          className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                          required
                          name="userName"
                        />
                      </div>

                      <div className="cols-span-1">
                        <div className="form-control">
                          <label className="label">
                            <span className=" text-white bg-blue-950">
                              Upload Photo (optional)
                            </span>
                          </label>
                          <input
                      
                            name="photo"
                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs"
                          />
                        </div>
                      </div>

                      <div className="form-control col-span-2">
                        <label className="label">
                          <span className="label-text dark:text-white">
                            Description (optional)
                          </span>
                        </label>

                        <textarea
                          type="text"
                          placeholder="Type your question"
                          className="textarea textarea-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                          name="description"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-control mt-6 w-full ">
                    <button className="py-3 px-4 rounded-md border border-transparent font-semibold bg-blue-500 text-white">
                      N E X T
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default createPoll;
