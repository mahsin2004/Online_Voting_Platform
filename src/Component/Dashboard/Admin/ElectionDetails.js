"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { MdDeleteForever, MdVerified } from "react-icons/md";
import Swal from "sweetalert2";
import ElectionInfo from "./components/ElectionInfo";
import ElectionCandidate from "./components/ElectionCandidate";
import { useEffect, useState } from "react";
import useAuth from "@/app/hook/useAuth";

const ElectionDetails = () => {
  const { id } = useParams();
  const [userRoles, setUserRoles] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`https://evs-delta.vercel.app/users/${user?.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUserRoles(res.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [user?.email]);

  console.log("userRole: ", userRoles?.isRole);

  const { data: elections = [] } = useQuery({
    queryKey: ["electionsDetails"],
    queryFn: async () => {
      const res = await axios.get(
        "https://evs-delta.vercel.app/create-vote?search"
      );
      return res.data;
    },
    refetchInterval: 100,
  });
  // console.log(elections);
  const filterElection = elections?.filter((election) => election?._id === id);
  // console.log(filterElection?.[0]?.email);
  // console.log(user?.email);
  const ElectionInfoProtract = filterElection?.[0]?.email == user?.email;

  // console.log(CandidateEmail);
  const { data: Voter = [], refetch } = useQuery({
    queryKey: ["CandidateEmail"],
    queryFn: async () => {
      const res = await axios.get(
        `https://evs-delta.vercel.app/candidate/under/users/${filterElection[0]?.name}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    refetchInterval: 100,
  });
  console.log("All Applied: ", Voter);

  const handleCandidateVerify = async (id) => {
    try {
      const res = await axios.patch(
        `https://evs-delta.vercel.app/candidate/verify/${id}`
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Verify",
          text: "This candidate has been Verified.",
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVerify = async (id) => {
    try {
      const res = await axios.patch(
        `https://evs-delta.vercel.app/candidateUnderVoter/verify/${id}`
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Verify",
          text: "This voter has been Verified.",
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCandidateDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `https://evs-delta.vercel.app/candidate/${id}`
        );

        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "This Candidate has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `https://evs-delta.vercel.app/candidateUnderVoter/${id}`
        );

        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "This voter has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  const { data: candidates = [] } = useQuery({
    queryKey: ["candidates1"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/candidate", {
        withCredentials: true,
      });
      return res.data;
    },
    refetchInterval: 1000,
  });

  const filterCandidate = candidates?.filter(
    (candidate) => candidate?.voteName === filterElection[0]?.name
  );

  console.log("FilterCandidate:", filterElection);

  const verifyCandidate = filterCandidate?.filter(
    (candidate) => candidate.isverify === "true"
  );
  console.log("VerifyCandidate:", verifyCandidate);

  // update election position by patch
  console.log("Election: ", filterElection[0]?.position);
  const handleElectionPositionTrue = (id) => {
    const position = true;
    const isSystemRunning = { position };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to start this Elections",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Start it!",
    }).then((res) => {
      if (res?.isConfirmed) {
        axios
          .patch(
            `https://evs-delta.vercel.app/create-vote/${id}`,
            isSystemRunning
          )
          .then((res) => {
            console.log(res?.data);
          })
          .catch((err) => console.error(err));
        console.log("ok", id);
        refetch();
      }
    });
  };

  const handleElectionPositionFalse = (id) => {
    const position = false;
    const isSystemRunning = { position };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to stop this Elections",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Stope it!",
    }).then((res) => {
      if (res?.isConfirmed) {
        axios
          .patch(
            `https://evs-delta.vercel.app/create-vote/${id}`,
            isSystemRunning
          )
          .then((res) => {
            console.log(res?.data);
          })
          .catch((err) => console.error(err));
        console.log("ok", id);
        refetch();
      }
    });
  };

  const handleFinishedElection = (id) => {
    console.log(id);
    const position = false;
    const isFinished = true;
    const isSystemFinished = { position, isFinished };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to finished this Elections",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Stope it!",
    }).then((res) => {
      if (res?.isConfirmed) {
        axios
          .patch(
            `https://evs-delta.vercel.app/create-vote/${id}`,
            isSystemFinished
          )
          .then((res) => {
            console.log(res?.data);
          })
          .catch((err) => console.error(err));
        console.log("ok", id);
        refetch();
      }
    });
  };

  console.log(filterElection?.[0]?.isFinished);

  return (
    <div className="">
      {(ElectionInfoProtract || userRoles?.isRole === "Admin") && (
        <div className="text-white/90">
          {/* ELection Name */}

          <div className="">
            <div>
              <h3 className="text-4xl font-bold text-center py-3">
                {filterElection[0]?.OrganizatonName} Election Details
              </h3>
            </div>

            {/* Election Info */}
            <div className="">
              <div className="py-2">
                <h4 className="text-2xl font-bold ">All Info:</h4>
                <div className="text-2xl font font-medium">
                  {filterElection?.map((election) => (
                    <ElectionInfo
                      key={election?._id}
                      election={election}
                      refetch={refetch}
                    ></ElectionInfo>
                  ))}
                </div>
              </div>

              {/* start & stop elections */}
              {filterElection?.[0]?.isFinished != true ? (
                <div className="">
                  <div className="">
                    {filterElection[0]?.position != true ? (
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-green-500">
                          Start This Elections
                        </h2>
                        <button
                          onClick={() =>
                            handleElectionPositionTrue(filterElection[0]?._id)
                          }
                          className="btn btn-primary btn-sm"
                        >
                          Start
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-red-500">
                          Stop this election
                        </h2>
                        <button
                          onClick={() =>
                            handleElectionPositionFalse(filterElection[0]?._id)
                          }
                          className="btn btn-primary btn-sm"
                        >
                          Stop
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Finished Elections */}
                  <div className="flex items-center gap-2 pt-2">
                    <h2 className="text-lg font-semibold text-green-500">
                      Finished This Elections
                    </h2>
                    <button
                      onClick={() =>
                        handleFinishedElection(filterElection[0]?._id)
                      }
                      className="btn btn-primary btn-sm"
                    >
                      Finished
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-red-500 text-xl font-semibold">This Elections is Finished</div>
              )}
            </div>
          </div>

          {/* Election Candidates */}
          <div className="mt-6">
            <h4 className="text-2xl font-bold mb-5">All Candidate:</h4>
            <div className="grid md:grid-cols-2  gap-2 justify-center items-center">
              {verifyCandidate?.map((candidate, index) => (
                <ElectionCandidate
                  key={candidate?._id}
                  index={index}
                  candidate={candidate}
                  refetch={refetch}
                ></ElectionCandidate>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-2 mt-10">
            <div className="">
              <div>
                <p className="font-bold text-center text-2xl  ">
                  All Candidates : {filterCandidate?.length}
                </p>
                <hr className="w-96 mx-auto h-2 mb-1 mt-1 bg-gray-400"></hr>

                <div className="overflow-x-auto py-2 pb-12">
                  <table className="table text-black">
                    <thead>
                      <tr className="text-md text-white/90 font-semibold text-center border-b-2 bg-gray-400">
                        <th>
                          <label>
                            <p className="">Number</p>
                          </label>
                        </th>
                        {/* <th>Name</th> */}
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterCandidate?.map((candidate, index) => (
                        <tr
                          key={candidate._id}
                          className={`${
                            index % 2 === 0 ? "bg-gray-100/80" : "bg-white/85"
                          } text-center font-semibold border-b border-gray-600`}
                        >
                          <th>
                            <label>
                              <p className="text-black">{index + 1}</p>
                            </label>
                          </th>
                          {/* <td>{candidate.candidateName}</td> */}
                          <td>{candidate.candidateEmail}</td>
                          <td>
                            <div className="flex justify-center items-center">
                              {userRoles?.isRole === "Modarator" &&
                                (candidate?.isverify === "true" ? (
                                  <div className="flex gap-2">
                                    <MdVerified className="text-3xl text-green-600 text-center ml-5 cursor-pointer" />
                                    <button
                                      className="bg-red-500 text-white/90 px-2 py-1 rounded-sm"
                                      onClick={() =>
                                        handleCandidateDelete(candidate._id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex gap-2">
                                    <button
                                      className="bg-green-500 text-white/90 px-2 py-1 rounded-sm"
                                      onClick={() =>
                                        handleCandidateVerify(candidate._id)
                                      }
                                    >
                                      Accept
                                    </button>
                                    <button
                                      className="bg-red-500 text-white/90 px-2 py-1 rounded-sm"
                                      onClick={() =>
                                        handleCandidateDelete(candidate._id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ))}
                              {userRoles?.isRole === "Admin" &&
                                (candidate?.isverify === "true" ? (
                                  <MdVerified className="text-3xl text-green-600 text-center ml-5 cursor-pointer" />
                                ) : (
                                  <div className="flex gap-2">
                                    <MdDeleteForever className="text-3xl text-red-600 text-center ml-5 cursor-pointer" />
                                  </div>
                                ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="">
              <div>
                <p className="font-bold text-center text-2xl  ">
                  All Voters : {Voter?.length}
                </p>
                <hr className="w-96 mx-auto h-2 mb-1 mt-1 bg-gray-400"></hr>

                <div className="overflow-x-auto py-2 pb-12">
                  <table className="table text-gray-900">
                    <thead>
                      <tr className="text-md font-semibold text-center border-b-2 bg-gray-400">
                        <th>
                          <label>
                            <p className="text-white/90">Number</p>
                          </label>
                        </th>
                        {/* <th>Name</th> */}
                        <th className="text-white/90">Email</th>
                        <th className="text-white/90">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Voter?.map((voter, index) => (
                        <tr
                          key={voter._id}
                          className={`${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          } text-center font-semibold border-b border-gray-600`}
                        >
                          <th>
                            <label>
                              <p className="text-black">{index + 1}</p>
                            </label>
                          </th>
                          {/* <td>{candidate.candidateName}</td> */}
                          <td>{voter.candidateEmail}</td>
                          <td>
                            <div className="flex justify-center items-center">
                              {userRoles?.isRole === "Modarator" &&
                                (voter?.isverify == "true" ? (
                                  <div className="flex gap-2">
                                    <MdVerified className="text-3xl text-green-600 text-center ml-5 cursor-pointer" />
                                    <button
                                      className="bg-red-500 text-white/90 px-2 py-1 rounded-sm"
                                      onClick={() => handleDelete(voter._id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex gap-2">
                                    <button
                                      className="bg-green-500 text-white/90 px-2 py-1 rounded-sm"
                                      onClick={() => handleVerify(voter._id)}
                                    >
                                      Accept
                                    </button>
                                    <button
                                      className="bg-red-500 text-white/90 px-2 py-1 rounded-sm"
                                      onClick={() => handleDelete(voter._id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ))}
                              {userRoles?.isRole === "Admin" &&
                                (voter?.isverify === "true" ? (
                                  <MdVerified className="text-3xl text-green-600 text-center ml-5 cursor-pointer" />
                                ) : (
                                  <div className="flex gap-2">
                                    <MdDeleteForever className="text-3xl text-red-600 text-center ml-5 cursor-pointer" />
                                  </div>
                                ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectionDetails;
