"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Protected from "../Protected/Protected";
import axios from "axios";

const OpenCndidate = () => {
  const [openCandidate, setOpenCndidate] = useState();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/candidate", { withCredentials: true })
      .then((res) => {
        setOpenCndidate(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(openCandidate);

  const filterCandidate = openCandidate?.filter(
    (candidat) => candidat?.voteName === id && candidat?.isverify == "true"
  );
  console.log(filterCandidate);

  return (
    <Protected>
      <div className="card ">
        <div className="grid  md:grid-cols-3 grid-cols-2 gap-3 px-6">
          {filterCandidate?.map((candidate, index) => (
            <div
              key={candidate?._id}
              className={`${
                index % 2 === 0 ? "bg-slate-700 rounded-xl" : "bg-slate-500"
              } text-center font-semibold rounded-xl`}
            >
              <div className="flex items-center justify-center">
                <Image
                  src={candidate?.candidatePhoto}
                  width={250}
                  height={250}
                  alt="Image"
                  className="rounded-xl h-[120px]"
                />
              </div>
              <div className="py-4 text-white">
                <h2 className="">Name: {candidate?.candidateName}</h2>
                {/* <h2 className="">Email: {candidate?.candidateEmail}</h2> */}
                <h2 className="">Id: {candidate?.candidateID}</h2>
                <div className=""></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Protected>
  );
};

export default OpenCndidate;
