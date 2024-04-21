/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Protected from "@/Component/Protected/Protected";
import Swal from "sweetalert2";
import { UploadImage } from "@/Component/shareComponent/utilites";

const page = () => {
  const [allPollAns, setAllPollAns] = useState();
  const [allCreatePoll, setAllCreatePoll] = useState();
  const { user } = useAuth();
  const ownerEmail = user?.email;
  const { id } = useParams();
  const userName = id;
  const pollVoteCount = 0;
  // console.log(userName);

  const { data, refetch } = useQuery({
    queryKey: ["poll-ans"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/poll-ans");
      setAllPollAns(res?.data);
      return res?.data;
    },
    // refetchInterval: 100,
  });

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/create-poll")
      .then((res) => {
        setAllCreatePoll(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // console.log(allCreatePoll);

  const filterCreatePoll = allCreatePoll?.filter(
    (createPoll) => createPoll?.userName == id
  );
  console.log(filterCreatePoll?.[0]?.wonerEmail);
  console.log(user?.email);

  // console.log(allPollAns);
  const filterAllPollAns = allPollAns?.filter(
    (pollAns) => pollAns?.userName == userName
  );
  console.log(filterAllPollAns);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    const form = e.target;
    const question = form.question.value;
    const image = form.questionPhoto.files[0];
    const imageData = await UploadImage(image);
    const questionPhoto = imageData?.data?.display_url ;

    if(filterCreatePoll?.[0]?.wonerEmail == user?.email) {
      const addPollQuestion = {
        question,
        questionPhoto,
        ownerEmail,
        userName,
        pollVoteCount,
      };
      console.log(addPollQuestion);

      axios
        .post("https://evs-delta.vercel.app/poll-ans", addPollQuestion)
        .then((res) => {
          // console.log(res);
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${filterAllPollAns?.length + 1} Answer added`,
            showConfirmButton: false,
            timer: 1000,
          });
          form.reset();
        })
        .catch((err) => {
          console.error("err", err);
        });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You are not legal user for this poll",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <Protected>
      <div className="my-10 text-white pt-24 min-h-screen ">
        <div>
          <div className="w-full lg:max-w-[900px] mx-auto lg:p-6 px-2">
            <div className="py-6 lg:p-7 bg-[#f1faee] border-gray-200 rounded-xl shadow-2xl dark:bg-gray-800 dark:border-gray-700 ">
              <h3 className="text-4xl font-bold text-center">Create Poll</h3>
              <h3 className="text-xl font-bold text-center">Answer Options</h3>
              <h3 className="px-8">
                You added: {filterAllPollAns?.length} question
              </h3>
              <form onSubmit={handleAddQuestion} className="card-body">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        Answer Options
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Option"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                      required
                      name="question"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-white bg-blue-950">
                        Upload Photo (optional)
                      </span>
                    </label>
                    <input
                    required
                      name="questionPhoto"
                      type="file"
                      className="file-input file-input-bordered w-full max-w-xs"
                    />
                  </div>

                </div>

                <div className="form-control mt-6 w-full ">
                  {filterAllPollAns?.length > 0 ? (
                    <button className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                      add more question
                    </button>
                  ) : (
                    <button className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                      add question
                    </button>
                  )}
                </div>
              </form>
              {filterAllPollAns?.length > 0 && (
                <div className="card-body">
                  <Link
                    href={`/poll-participate/${id}`}
                    className="py-3 w-full px-4 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Show you poll
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default page;
