/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Protected from "@/Component/Protected/Protected";

const page = () => {
  const [pollAns, setPollAns] = useState();
  const [createPoll, setCreatePoll] = useState();
  const { id } = useParams();
  console.log(id);

  const { data, refetch } = useQuery({
    queryKey: ["poll-ans"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/poll-ans");
      setPollAns(res?.data);
      return res?.data;
    },
  });

  // useEffect(() => {
  //   axios
  //     .get("https://evs-delta.vercel.app/poll-ans")
  //     .then((res) => {
  //       setPollAns(res?.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);
  console.log(pollAns);

  const filterPollAns = pollAns?.filter((ans) => ans?.userName == id);
  console.log(filterPollAns);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/create-poll")
      .then((res) => {
        setCreatePoll(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filterCreatePoll = createPoll?.filter((poll) => poll?.userName == id);
  console.log(filterCreatePoll);

  return (
    <div className="text-white min-h-screen pt-12">
      <div className="text-white p-5  pt-12">
        <div className="bg-gray-800 md:w-3/4 mx-auto rounded-md">
          <div className="">
            <h2 className="text-center font-bold text-3xl py-5 pb-5">
              {filterCreatePoll?.[0]?.title}
            </h2>
          </div>
          {filterPollAns?.map((pollAns, ind) => (
            <>
              <div
                key={pollAns._id}
                className="form-control md:w-[50%] mx-auto "
              >
                <label className="label cursor-pointer">
                  <span className="label-text">
                    <Image
                      className=" rounded-full"
                      src={pollAns?.questionPhoto}
                      alt="alt"
                      width={100}
                      height={100}
                    />
                  </span>
                  <span className="">{pollAns?.question}</span>
                  <span>
                    Vote:{" "}
                    <span className="text-red-500">
                      {pollAns?.pollVoteCount}
                    </span>
                  </span>
                </label>
                <hr></hr>
              </div>
            </>
          ))}
          <div className="text-center p-2">
            <Link href={`/poll-participate/${id}`} className="btn btn-sm">
              Back to poll
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
