"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import useAuth from "@/app/hook/useAuth";
import Swal from "sweetalert2";
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useQuery } from "@tanstack/react-query";
import Protected from "../Protected/Protected";

const PollParticipate = () => {
  const [pollAns, setPollAns] = useState();
  const [createPoll, setCreatePoll] = useState();
  const [pollAnsId, setPollAnsId] = useState();
  const [pollParticipate, setPollParticipate] = useState();
  const { id } = useParams();
  const router = useRouter();
  console.log(id);
  const { user } = useAuth();
  // console.log(user?.email);
  const participateUser = { pollUserName: id, email: user?.email };
  console.log(participateUser);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/poll-ans")
      .then((res) => {
        setPollAns(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
  console.log(pollAns);
  const filterPollAns = pollAns?.filter((poll) => poll?.userName == id);
  console.log(filterPollAns);

  const filterCreatePoll = createPoll?.filter(
    (crPoll) => crPoll?.userName == id
  );
  console.log(filterCreatePoll);

  const { data, refetch } = useQuery({
    queryKey: ["participate"],
    queryFn: async () => {
      const res = await axios.get(
        "https://evs-delta.vercel.app/poll-participate",{
          withCredentials: true,
        }
      );
      setPollParticipate(res?.data);
      return res?.data;
    },
  });
  console.log(pollParticipate);

  // useEffect(() => {
  //   axios
  //     .get("https://evs-delta.vercel.app/poll-participate")
  //     .then((res) => {
  //       // console.log(res?.data);
  //       setPollParticipate(res?.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  console.log(pollParticipate);
  const filterPollParticipate = pollParticipate?.filter(
    (participate) =>
      participate?.email == user?.email && participate?.pollUserName == id
  );
  console.log(filterPollParticipate);

  const handleCoutnVote = (id) => {
    setPollAnsId(id);
  };

  const handaleAddVote = () => {
    console.log(pollAnsId);
    if (filterPollParticipate?.[0]?.email != user?.email) {
      axios
        .get(`https://evs-delta.vercel.app/poll-ans/${pollAnsId}`)
        .then((res) => {
          console.log(res?.data);
          const voteCount = res?.data?.pollVoteCount;
          const updataVoteCount = voteCount + 1;
          const updatePollCount = { updataVoteCount };
          console.log(updatePollCount);

          axios
            .patch(
              `https://evs-delta.vercel.app/poll-ans/${pollAnsId}`,
              updatePollCount
            )
            .then((res) => {
              console.log("update vote", res?.data);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Vote added",
                showConfirmButton: false,
                timer: 1500,
              });
              router.push(`/poll-result/${id}`);

              axios
                .post(
                  "https://evs-delta.vercel.app/poll-participate",
                  participateUser
                )
                .then((res) => {
                  console.log("participate post", res?.data);
                  refetch();
                })
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Unsuccessful",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    refetch();
  };
  const shareUrl = `electronic-voting-system-beta.vercel.app/poll-participate/${id}`;
  const handleCopy = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "URL copied",
      showConfirmButton: false,
      timer: 1000,
    });
  };

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
                    <input
                      onClick={() => handleCoutnVote(pollAns?._id)}
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
                    />
                  </label>
                  <hr></hr>
                </div>
              </>
            ))}
            <div className="p-5 flex gap-2 justify-center">
              <button
                onClick={() => handaleAddVote()}
                className="btn btn-primary btn-sm"
              >
                submit
              </button>
              <div className="">
                <Link href={`/poll-result/${id}`} className="btn btn-sm ">
                  Show Result
                </Link>
              </div>

              <div className="">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn btn-sm"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Share
                </button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-center pb-2 text-lg">
                      Share This Poll
                    </h3>

                    <div className="text-center">
                      <h2 className="pt-5">Derect Share</h2>
                      <div className="flex gap-4 pt-3 justify-center">
                        <FacebookShareButton url={shareUrl}>
                          <FacebookIcon className="rounded-full size-8" />
                        </FacebookShareButton>

                        <WhatsappShareButton url={shareUrl}>
                          <WhatsappIcon className="rounded-full size-8" />
                        </WhatsappShareButton>
                      </div>
                      <div className="pt-10 pb-5">
                        <h2 className="">Share Link</h2>
                        <h2 className="bg-black p-1 px-3 rounded-md">
                          {shareUrl}
                          <CopyToClipboard text={shareUrl}>
                            <span className="pl-1">
                              <button
                                onClick={handleCopy}
                                className="btn btn-sm"
                              >
                                copy
                              </button>
                            </span>
                          </CopyToClipboard>
                        </h2>
                      </div>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default PollParticipate;
