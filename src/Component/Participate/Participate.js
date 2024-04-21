/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Protected from "../Protected/Protected";
import Rating from "react-rating";
import './participate.css'

const Participate = () => {
  const [allCandidate, setAllCandidate] = useState();
  const [selectCandidateId, setSelectCandidateId] = useState();
  // const [showVote, setShowVote] = useState();
  const [voterEmail, setVoterEmail] = useState();
  const [participate, setParticipate] = useState();
  const [candidateUnderUser, setCandidateUnderUser] = useState();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const router = useRouter();
  console.log(id);
  const updateVoterEmail2 = user?.email;
  console.log(user?.email);
  const updateVoterEmail = { updateVoterEmail2 };
  // console.log(updateVoterEmail);

  const updateParticipate = { email: user?.email, voteName: id };

  // Modal for feedback
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0)
  const handleSubmitFeedback = async(e) => {
    e.preventDefault();
    const from = e.target;
    const candiatename = from.name.value;
    const message = from.message.value;
    const name = user.displayName;
    const email = user.email;
    const ratings = rating;
    const img = user.photoURL;
    const feedback = {candiatename,message,name,email,img,ratings}
    const res = await axios.post('https://evs-delta.vercel.app/feedback',{feedback})
    if(res.data.acknowledged){
      setIsModalOpen(false)
      router.push(`/result/${id}`);
    }
  };
  const toggleModal = () =>{
    setIsModalOpen(!isModalOpen);
    router.push(`/result/${id}`);
  } 
  

  // console.log(updateParticipate);

  //  all election filter
  const [allElections, setAllElections] = useState();
  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/create-vote?search")
      .then((res) => {
        setAllElections(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(allElections);
  const filterAllElections = allElections?.filter(
    (election) => election?.name == id
  );
  console.log(filterAllElections?.[0]?.position);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/CandiateUnderUser", {
        withCredentials: true,
      })
      .then((res) => {
        setCandidateUnderUser(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(candidateUnderUser);

  const filterUndreUser = candidateUnderUser?.filter(
    (underUser) =>
      underUser?.voteName == id && underUser?.candidateEmail == user?.email
  );
  // console.log(filterUndreUser);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/candidate", { withCredentials: true })
      .then((res) => {
        setAllCandidate(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const { data, refetch } = useQuery({
    queryKey: ["participate"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/participate", {
        withCredentials: true,
      });
      setParticipate(res?.data);
      return res?.data;
    },
  });

  const filterCandidate = allCandidate?.filter(
    (candidate) => candidate?.voteName == id && candidate?.isverify == "true"
  );
  console.log(filterCandidate);

  console.log(selectCandidateId)
  const handalCountVote = (id) => {
    // setRouteID(id)
    // console.log(id);
    setSelectCandidateId(id);
  };
  console.log(selectCandidateId)
  const filterParticipet = participate?.filter(
    (participat) =>
      participat?.email === user?.email && participat?.voteName === id
  );
  // console.log(filterParticipet?.[0]?.email);

  const handaleAddVote = async () => {
    // console.log(candidat?.adminEmail);

    if (
      filterParticipet?.[0]?.email != user?.email &&
      filterUndreUser?.[0]?.isverify == "true" &&
      filterAllElections?.[0]?.position == true
    ) {
      axios.get(`https://evs-delta.vercel.app/candidate/${selectCandidateId}`,{withCredentials: true})
      .then(async(data) => {
        console.log(data?.data);
        const updateVot =await data?.data?.voteCount;
        console.log(updateVot)
        const updateVoteCount2 = updateVot + 1;
        const updateVoteCount = { updateVoteCount2 };
        console.log(updateVot)
        console.log(updateVoteCount);

        // add vote number
        axios
          .patch(
            `https://evs-delta.vercel.app/candidate/${selectCandidateId}`,
            updateVoteCount
          )
          .then((res) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Voted successfully",
              showConfirmButton: false,
              timer: 1500,
            });

            setIsModalOpen(true)
            // console.log(res);
            // participate api update
            axios
              .post(
                "https://evs-delta.vercel.app/participate",
                updateParticipate
              )
              .then((res) => {
                console.log("partcipate", res);
              })
              .catch((err) => {
                console.error("participate", err);
              });
          })
          .catch((err) => {
            // console.error(err);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "You are not verified user",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
         
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "You are not verified user",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      });
       
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You are not verified user",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };




  return (
    <Protected>
      <div className="text-white p-5 min-h-screen">
      {
        isModalOpen && <div className='w-96 mt-14 mx-auto relative bg-gray-700 px-8 py-5 rounded'>
        <div  onClick={toggleModal} className=" absolute top-0 right-0 bg-[#130f2a] px-2 py-1">
        <span className=" cursor-pointer" >X</span>

        </div>
        <div className=" text-center">
        <h2 className=" text-2xl font-semibold text-gray-200">Feedback</h2>
        <div style={{ display: 'inline-block' }}>
          <Rating style={{ maxWidth: 200 }} value={rating} onChange={setRating} />
        </div>
        </div>
          <form onSubmit={handleSubmitFeedback}>
            <div className="">
            <input className="bg-[#130f2a] mb-2 border border-[#6751b9] py-2 px-1 w-full rounded-xl" name="name" required type="text" placeholder='Enter your Candidate Name' />
            </div>
            <textarea className="bg-[#130f2a] border border-[#6751b9] py-2 px-1 w-full rounded-xl" required name="message" placeholder='Enter your Feedback'></textarea>
            <button type="submit">submit</button>
          </form>
        </div>
      }
       {
        !isModalOpen && <div>
        <div className="flex justify-center gap-32">
           {filterCandidate?.length != 0 && (
             <h2 className="text-center text-xl md:text-3xl font-bold p-5">
               Choose your favorite person
             </h2>
           )}
         </div>
         {filterCandidate?.map((candidat, ind) => (
           <>
             <div
               key={candidat._id}
               className="form-control md:w-[50%] mx-auto py-2"
             >
               <label className="label cursor-pointer">
                 <span className="label-text">
                   <Image
                     className=" w-24 h-24 rounded-full object-cover"
                     src={candidat?.candidatePhoto}
                     alt="alt"
                     width={100}
                     height={100}
                   />
                 </span>
                 <span className="label-text text-white">{candidat?.candidateName}</span>
                 <input
                   onClick={() => handalCountVote(candidat?._id)}
                   type="radio"
                   name="radio-10"
                   className="radio checked:bg-blue-500 bg-white"
                 />
               </label>
               <hr></hr>
             </div>
           </>
         ))}
         <div className="">
           {filterCandidate?.length == 0 && (
             <h2 className="text-center text-xl md:text-3xl font-bold p-5">
               No candidate partcipate
             </h2>
           )}
         </div>
         <div className="text-center pt-5">
           {filterParticipet?.[0]?.email == user?.email ||
           filterAllElections?.[0]?.position == false ||
           filterCandidate?.length == 0 ? (
             <button disabled className="btn btn-primary">
               submit
             </button>
           ) : (
             <button
               onClick={() => handaleAddVote()}
               className="btn btn-primary"
             >
               submit
             </button>
           )}
         </div>
        </div>
       }
        <div>
      </div>
     
        </div>
    </Protected>
  );
};

export default Participate;