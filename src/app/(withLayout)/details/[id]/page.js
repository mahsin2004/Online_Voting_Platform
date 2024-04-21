"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/Component/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/app/hook/useAuth";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";
import Swal from "sweetalert2";
import OpenCndidate from "@/Component/OpenCandidate/OpenCndidate";

const Page = () => {
  const { id } = useParams();
  console.log(id);
  const { user } = useAuth();

  const { data: userRoles = [], refetch } = useQuery({
    queryKey: ["userRoles12"],
    queryFn: async () => {
      const res = await axios.get(
        `https://evs-delta.vercel.app/users/${user?.email}`,
        { withCredentials: true }
      );
      return res.data;
    },
    refetchInterval: 1000,
  });

  console.log(userRoles?.isRole);

  const { data: showAllVote = [] } = useQuery({
    queryKey: ["showAllElectons"],
    queryFn: async () => {
      const res = await axios.get(
        "https://evs-delta.vercel.app/create-vote?search"
      );
      return res.data;
    },
    refetchInterval: 1000,
  });

  // console.log(showAllVote);
  const filterModeratorElections = showAllVote?.filter(
    (election) => election?.email == user?.email
  );

  const filterElectionsByUserName = showAllVote?.filter(
    (election) => election?.name == id
  );
  console.log(filterElectionsByUserName?.[0]?.position);
  console.log(filterElectionsByUserName);

  const filterAllVote = showAllVote.filter((allVot) => allVot?.name == id);
  console.log("Election Name:",filterAllVote);

  const { data: applyForCandidate = [] } = useQuery({
    queryKey: ["candidates479"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/candidate", {
        withCredentials: true,
      });
      return res.data;
    },
    refetchInterval: 1000,
  });

  // FilterApplyCandidate
  const candidateApply = applyForCandidate?.filter(
    (candidate) => candidate.candidateEmail === user?.email && candidate.voteName === filterAllVote[0]?.name
  );
  console.log("get Candidate", candidateApply);

  const { data: applyForVoter = [] } = useQuery({
    queryKey: ["Voter4829"],
    queryFn: async () => {
      const res = await axios.get(
        "https://evs-delta.vercel.app/CandiateUnderUser",
        { withCredentials: true }
      );
      return res.data;
    },
    refetchInterval: 1000,
  });

  const voterApply = applyForVoter?.filter(
    (candidate) => candidate.candidateEmail === user?.email && candidate.voteName === filterAllVote[0]?.name
  );
  console.log("get Voter", voterApply);

  

  const shareUrl = `electronic-voting-system-beta.vercel.app/details/${id}`;
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
    <div className="min-h-screen max-w-7xl mx-auto pt-20">
      <div className="text-white pt-10 md:px-8 px-3">
        <div className="flex justify-center items-center gap-1 pb-4">
          <h2 className="text-center font-bold text-2xl">Position: </h2>

          {(filterAllVote[0]?.isFinished != true) ?
          <div className="">

          <h2 className="text-center text-green-500 font-bold text-2xl">
            {filterAllVote[0]?.position == true && "Running"}
          </h2>
          <h2 className="text-center text-yellow-400 font-bold text-2xl">
            {filterAllVote[0]?.position != true && "Running soon"}
          </h2>
        </div>

        :
        <div className="text-center text-red-500 font-bold text-2xl">Finished</div>}

          
        </div>

        <div className=" bg-gray-800 rounded-md pt-8 flex flex-col-reverse md:flex-col">
          <div className="md:flex justify-between">
            <div className=" card flex-1">
              <div className="mx-auto ">
                <h2 className="text-center md:text-3xl text-2xl font bold pb-4 font-bold">
                  Information
                </h2>
                <div className="gap-32">
                  <figure className="">
                    <Image
                      src={filterAllVote[0]?.photo}
                      alt="alt"
                      width={300}
                      height={300}
                      className="rounded-lg"
                    />
                  </figure>
                  <div className="md:py-0">
                    <div className="pt-5">
                      <h1 className=" text-xl  font-bold">
                        Name: {filterAllVote[0]?.OrganizatonName}{" "}
                      </h1>
                      <h2 className="text-xl  font-bold">
                        Type: {filterAllVote[0]?.Type}
                      </h2>
                      <h2 className="text-green-400 text-xl font-bold">
                        Start: {filterAllVote[0]?.startDate} (
                        {filterAllVote[0]?.startTime})
                      </h2>
                      <h2 className=" text-red-400 text-xl  font-bold">
                        End: {filterAllVote[0]?.endDate} (
                        {filterAllVote[0]?.endTime})
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* candidate */}
            <div className="flex-1 pt-12 md:pt-0 pb-5">
              <h2 className="text-center md:text-3xl text-2xl font bold pb-4 font-bold">
                Candidates
              </h2>
              <OpenCndidate />
            </div>
          </div>

          {/* buttons */}
          <div className="  pb-4 flex justify-center md:pt-8">
            {userRoles?.isRole === "Admin" ? (
              <div className="  flex  gap-2 justify-center items-center pb-8">
                {filterElectionsByUserName?.[0]?.position != true ? (
                  <button
                    className="text-[16px] btn border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500 "
                    disabled
                  >
                    Participate
                  </button>
                ) : (
                  <Link
                    href={`/participate/${filterAllVote?.[0].name}`}
                    className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                  >
                    Participate
                  </Link>
                )}
                {/* <Link href={`/show-all-vote/candidate`}  className="btn btn-sm"> Candidates</Link> */}

                <Link
                  href={`/result/${filterAllVote?.[0].name}`}
                  className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                >
                  result
                </Link>
                <div className="">
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
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
                        Share This Election
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
            ) : userRoles?.isRole === "Modarator" ? (
              filterModeratorElections?.length > 0 &&
              filterModeratorElections?.find(
                (voteName) => voteName.name === filterAllVote[0]?.name
              ) ? (
                <div className="  flex  gap-2 justify-center items-center pb-8">
                  {filterElectionsByUserName?.[0]?.position != true ? (
                    <button
                      className="text-[16px] btn border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500 "
                      disabled
                    >
                      Participate
                    </button>
                  ) : (
                    <Link
                      href={`/participate/${filterAllVote?.[0].name}`}
                      className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                    >
                      Participate
                    </Link>
                  )}
                  {/* <Link href={`/show-all-vote/candidate`}  className="btn btn-sm"> Candidates</Link> */}

                  <Link
                    href={`/result/${filterAllVote?.[0].name}`}
                    className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                  >
                    result
                  </Link>
                  <div className="">
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <button
                      className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
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
                          Share This Election
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
              ) : (
                <div className="flex flex-col space-y-2 mt-2">
                  {candidateApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                  candidateApply?.find(
                    (verify) => verify.isverify === "true"
                  ) ? (
                    ""
                  ) : candidateApply?.find(
                      (voteName) => voteName.voteName === filterAllVote[0]?.name
                    ) &&
                    candidateApply?.find(
                      (verify) => verify.isverify === "false"
                    ) ? (
                    <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 ">
                      Candidate In Process
                    </button>
                  ) : (
                    <Modal
                      electionId={filterAllVote[0]?._id}
                      buttonName={"Apply for a candidate"}
                      type={2}
                    />
                  )}

                  {voterApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                  voterApply?.find((verify) => verify.isverify === "true") ? (
                    ""
                  ) : voterApply?.find(
                      (voteName) => voteName.voteName === filterAllVote[0]?.name
                    ) &&
                    voterApply?.find(
                      (verify) => verify.isverify === "false"
                    ) ? (
                    <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 ">
                      Voter In Process
                    </button>
                  ) : (
                    <Modal
                      electionId={filterAllVote[0]?._id}
                      buttonName={"Apply for a voter"}
                      type={1}
                    />
                  )}

                  {(voterApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                    voterApply?.find((verify) => verify.isverify === "true")) ||
                  (candidateApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                    candidateApply?.find(
                      (verify) => verify.isverify === "true"
                    )) ? (
                    <div className="flex gap-2 justify-center items-center pb-8">
                      {filterElectionsByUserName?.[0]?.position !== true ? (
                        <button
                          className="text-[16px] btn border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                          disabled
                        >
                          Participate
                        </button>
                      ) : (
                        <Link
                          href={`/participate/${filterAllVote?.[0].name}`}
                          className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                        >
                          Participate
                        </Link>
                      )}
                      <Link
                        href={`/result/${filterAllVote?.[0].name}`}
                        className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                      >
                        Result
                      </Link>
                      <div>
                        <button
                          className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                          onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                          }
                        >
                          Share
                        </button>
                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <h3 className="font-bold text-center pb-2 text-lg">
                              Share This Election
                            </h3>
                            <div className="text-center">
                              <h2 className="pt-5">Direct Share</h2>
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
                  ) : null}
                </div>
              )
            ) : userRoles?.isRole === "user" ? (
              <div className="flex flex-col space-y-2 mt-2">
                {candidateApply?.find(
                  (voteName) => voteName.voteName === filterAllVote[0]?.name
                ) &&
                candidateApply?.find((verify) => verify.isverify === "true") ? (
                  ""
                ) : candidateApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                  candidateApply?.find(
                    (verify) => verify.isverify === "false"
                  ) ? (
                  <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 ">
                    Candidate In Process
                  </button>
                ) : (
                  <Modal
                    electionId={filterAllVote[0]?._id}
                    buttonName={"Apply for a candidate"}
                    type={2}
                  />
                )}

                {voterApply?.find(
                  (voteName) => voteName.voteName === filterAllVote[0]?.name
                ) &&
                voterApply?.find((verify) => verify.isverify === "true") ? (
                  ""
                ) : voterApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                  voterApply?.find((verify) => verify.isverify === "false") ? (
                  <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 ">
                    Voter In Process
                  </button>
                ) : (
                  <Modal
                    electionId={filterAllVote[0]?._id}
                    buttonName={"Apply for a voter"}
                    type={1}
                  />
                )}
                {(voterApply?.find(
                  (voteName) => voteName.voteName === filterAllVote[0]?.name
                ) &&
                  voterApply?.find((verify) => verify.isverify === "true")) ||
                (candidateApply?.find(
                  (voteName) => voteName.voteName === filterAllVote[0]?.name
                ) &&
                  candidateApply?.find(
                    (verify) => verify.isverify === "true"
                  )) ? (
                  <div className="flex gap-2 justify-center items-center pb-8">
                    {filterElectionsByUserName?.[0]?.position !== true ? (
                      <button
                        className="text-[16px] btn border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                        disabled
                      >
                        Participate
                      </button>
                    ) : (
                      <Link
                        href={`/participate/${filterAllVote?.[0].name}`}
                        className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                      >
                        Participate
                      </Link>
                    )}
                    <Link
                      href={`/result/${filterAllVote?.[0].name}`}
                      className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                    >
                      Result
                    </Link>
                    <div>
                      <button
                        className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                        onClick={() =>
                          document.getElementById("my_modal_3").showModal()
                        }
                      >
                        Share
                      </button>
                      <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <h3 className="font-bold text-center pb-2 text-lg">
                            Share This Election
                          </h3>
                          <div className="text-center">
                            <h2 className="pt-5">Direct Share</h2>
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
                ) : null}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
