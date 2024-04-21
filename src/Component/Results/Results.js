"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Protected from "../Protected/Protected";
import axios from "axios";

const Results = () => {
  const [candidates, setCandidates] = useState();
  const [allCreateVote, setAllCreateVote] = useState();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/candidate", {
        withCredentials: true,
      })
      .then((res) => {
        setCandidates(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(candidates);

  const filterCandidates = candidates?.filter(
    (candidate) => candidate?.voteName === id && candidate?.isverify == "true"
  );
  console.log(filterCandidates);

  // only win candidate data find
  const winerData = filterCandidates?.reduce((maxObject, currentObject) => {
    return currentObject?.voteCount > maxObject?.voteCount
      ? currentObject
      : maxObject;
  }, filterCandidates[0]);

  const winerId = winerData?._id;
  console.log(winerId);

  // loser candidate data
  const loserData = filterCandidates?.filter(candidate => candidate?._id != winerId );
  console.log(loserData);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/create-vote?search")
      .then((res) => {
        // console.log(res?.data);
        setAllCreateVote(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // console.log(allCreateVote);
  const filterCreateVote = allCreateVote?.filter(
    (createVote) => createVote?.name == id
  );
  console.log(filterCreateVote?.[0]?.isFinished);

  return (
    <Protected>
      {filterCreateVote?.[0]?.isFinished != true ? (
        <div className="max-w-7xl mx-auto px-4 pt-36 pb-16">
          <h1 className="text-center font-bold text-4xl pb-8">Results</h1>
          <div className="grid md:grid-cols-2 gap-5">
            {filterCandidates?.map((candidate, index) => (
              <div
                key={candidate?._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100 rounded-md" : "bg-white"
                } text-center font-semibold rounded-md`}
              >
                <div>
                  <Image
                    src={candidate?.candidatePhoto}
                    width={150}
                    height={150}
                    alt="Image"
                    className="rounded-t-md w-full h-auto md:h-[280px]"
                  />
                </div>
                <div className="py-4 text-gray-600 font-bold text-lg">
                  <h2 className="">Id: {candidate?.candidateID}</h2>
                  <h2 className="">Name: {candidate?.candidateName}</h2>

                  <h2 className="">
                    <span className="text-3xl text-red-600">
                      {candidate?.voteCount}
                    </span>{" "}
                    Votes Got
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // When Election finished then result show
        <div className="">
          {/* winer */}
          {winerData && (
            <div className="">
              <Image
                src={winerData?.candidatePhoto}
                alt="alt"
                width={300}
                height={300}
              />
              <h2 className="text-center">
                Congratulations Mr. {winerData?.candidateName}
              </h2>
              <h2 className="text-center">Vot {winerData?.voteCount}</h2>
            </div>
          )}

          {/* loser */}
          <div className=" flex gap-5 pt-12">
            {loserData?.map(loser=>(
              <div
              key={loser?._id}
              className=
                  "bg-white text-center font-semibold rounded-md"
            >
              <div>
                <Image
                  src={loser?.candidatePhoto}
                  width={300}
                  height={300}
                  alt="Image"
                  className="rounded-t-md w-40"
                />
              </div>
              <div className="py-4 text-gray-600 font-bold text-lg">
                <h2 className="">Id: {loser?.candidateID}</h2>
                <h2 className="">Name: {loser?.candidateName}</h2>

                <h2 className="">
                  <span className="text-3xl text-red-600">
                    {loser?.voteCount}
                  </span>{" "}
                  Votes Got
                </h2>
              </div>
            </div>
            ))}
          </div>
        </div>
      )}
    </Protected>
  );
};

export default Results;
