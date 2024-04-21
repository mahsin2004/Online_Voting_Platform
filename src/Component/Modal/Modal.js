import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { VscUnverified } from "react-icons/vsc";
import Swal from "sweetalert2";

const Modal = ({ electionId, buttonName, type }) => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios
      .get(`https://evs-delta.vercel.app/create-vote/${electionId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [electionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const candidateName = form.name.value;
    const candidateEmail = form.email.value;
    const candidatePhoto = form.photo.value;
    const voteName = form.candidate.value;
    const candidateID = form.candidateID.value;
    const brand = form.brand.value;
    const isverify = "false";
    const moderatorEmail = data?.email;
    const voteCount = 0;

    const formData = {
      candidateName,
      candidateEmail,
      voteName,
      candidatePhoto,
      isverify,
      moderatorEmail,
      voteCount,
      candidateID,
      brand,
    };

    if (type === 1) {
      axios
        .post(`https://evs-delta.vercel.app/candidate/under/users`, formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Apply Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
            form.reset();
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
      const type = 7;
      const notification = {
        senderEmail: user?.email,
        receiverEmail: user?.email,
        type: type,
        electionName: voteName,
      };

      axios
        .post("https://evs-delta.vercel.app/notification", notification)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else if (type === 2) {
      axios
        .post(`https://evs-delta.vercel.app/candidate`, formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Apply Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
            form.reset();
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      const type = 8;
      const notification = {
        senderEmail: user?.email,
        receiverEmail: user?.email,
        type: type,
        electionName: voteName,
      };

      axios
        .post("https://evs-delta.vercel.app/notification", notification)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <>
      <button
        onClick={() =>
          document
            .getElementById(`my_modal_3_${electionId}_${type}`)
            .showModal()
        }
        className="flex justify-center items-center text-lg border border-primary px-2 py-1 rounded-md hover:bg-primary/20 gap-1 "
      >
        <VscUnverified />{" "}
        <span className="text-[16px] py-[5px]">{buttonName}</span>
      </button>

      <>
        <dialog id={`my_modal_3_${electionId}_${type}`} className="modal z-10">
          <div className="modal-box bg-gray-900">
            <form method="dialog">
              <button className="btn btn-sm text-white btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-white text-2xl text-center mb-[10px]">
              {buttonName}
            </h3>
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-2">
              <div className="form-control">
                <label className="label">
                  <span className="text-white text-base">Name</span>
                </label>
                <input
                  type="text"
                  disabled
                  defaultValue={user?.displayName}
                  id="name"
                  name="name"
                  className="input input-bordered py-2 rounded-sm mb-2 text-white text-base"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="text-white text-base">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  disabled
                  defaultValue={user?.email}
                  name="email"
                  className="input input-bordered py-2 rounded-sm mb-2 text-white text-base"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-white text-base">Photo</span>
                </label>
                <input
                  type="text"
                  id="photo"
                  disabled
                  defaultValue={user?.photoURL}
                  name="photo"
                  className="input input-bordered py-2 rounded-sm mb-2 text-white text-base"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-white text-base">Vote Name</span>
                </label>
                <input
                  type="text"
                  id=""
                  disabled
                  defaultValue={data?.name}
                  name="candidate"
                  className="input input-bordered py-2 rounded-sm mb-2 text-white text-base"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-white text-base">Your ID</span>
                </label>
                <input
                  type="text"
                  id="text"
                  required
                  placeholder="Enter Your Id"
                  name="candidateID"
                  className="input input-bordered py-2 rounded-sm mb-2 text-white text-base"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-white text-base">Brand Name</span>
                </label>
                <input
                  type="text"
                  id="text"
                  required
                  placeholder="Enter Your Brand Name"
                  name="brand"
                  className="input input-bordered py-2 rounded-sm mb-2 text-white text-base"
                />
              </div>
              <button
                onClick={() =>
                  document
                    .getElementById(`my_modal_3_${electionId}_${type}`)
                    .close()
                }
                type="submit"
                className="bg-gray-700 font-bold mt-2 px-4 py-3 rounded-sm text-white text-base lg:col-span-2"
              >
                Submit
              </button>
            </form>
          </div>
        </dialog>
      </>
    </>
  );
};

export default Modal;
