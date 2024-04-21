"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";
import Swal from "sweetalert2";

const Share = () => {
  const [allVote, setAllVote] = useState();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/create-vote?search")
      .then((res) => {
        setAllVote(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  //   console.log(allVote);

  const filterAllVote = allVote?.filter((allVot) => allVot?.name == id);
  console.log(filterAllVote);

  const shareUrl = `electronic-voting-system-beta.vercel.app/share/${filterAllVote?.[0].name}`;

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
    <div>
      <div className="text-white p-5 pt-28">
        <div className=" rounded-md pb-6 bg-gray-800 shadow-xl md:flex md:flex-row">
          <div className="flex-1">
            <figure className="px-10 pt-10 flex items-center justify-center">
              <Image
                src={filterAllVote?.[0].photo}
                alt="alt"
                width={300}
                height={300}
              />
            </figure>
            <div className="card-body  text-center">
              <h2 className="card-title">
                <span className="text-xl font-bold text-red-600"></span>
              </h2>
              <p>Election Name: {filterAllVote?.[0].name} </p>
              <div className="">
                <h2 className="">
                  Start: {filterAllVote?.[0].startDate} (
                  {filterAllVote?.[0].startTime})
                </h2>
                <h2 className="">
                  End: {filterAllVote?.[0].endDate} (
                  {filterAllVote?.[0].endTime})
                </h2>
              </div>

              <div className="card-actions justify-center">
                <Link
                  href={`/participate/${filterAllVote?.[0].name}`}
                  className="btn btn-sm btn-primary"
                >
                  Participate
                </Link>
                {/* <Link href={`/show-all-vote/candidate`}  className="btn btn-sm"> Candidates</Link> */}
                <Link
                  href={`/show-all-vote/${filterAllVote?.[0].name}`}
                  className="btn btn-sm"
                >
                  {" "}
                  Candidates
                </Link>
                <Link
                  href={`/result/${filterAllVote?.[0].name}`}
                  className="btn btn-sm"
                >
                  {" "}
                  result
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center p-5 h-full md:pt-32 pt-6 ">
            <div className="flex justify-center items-center">
            <div className="text-center">
              <h2 className="">Share link</h2>
              <div className="flex gap-4 pt-3 justify-center">
                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon className="rounded-full size-8" />
                </FacebookShareButton>

                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon className="rounded-full size-8" />
                </WhatsappShareButton>

              </div>
              <div className="pt-8">
                <h2 className="">Share Link:</h2>
                <h2 className="bg-black p-1 px-3 rounded-md">
                  {shareUrl}
                  <CopyToClipboard text={shareUrl}>
                    <span className="pl-1">
                      <button onClick={handleCopy} className="btn btn-sm">
                        copy
                      </button>
                    </span>
                  </CopyToClipboard>
                </h2>
              </div>
            </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Share;
