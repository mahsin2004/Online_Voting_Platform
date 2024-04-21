const page = () => {
  return (
    <div className="text-white md:pt-5 mt-14">
      <div
        className="hero h-[300px] lg:h-[400px] "
        style={{
          backgroundImage: "url(https://i.postimg.cc/Bb8QxpK8/service2.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            {/* <h1 className=" text-5xl font-bold">Our Services</h1> */}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-5xl text-center font-bold mt-10 mb-5 text-gray-300">
          Our Services
        </h2>
      </div>
      <div className="w-10/12 grid lg:grid-cols-3 justify-center mx-auto gap-5 mt-10 mb-10">
        <div className="bg-blue-900 border-r- rounded-md   p-4 hover:bg-blue-800">
          <h2 className="text-center text-2xl font-bold">Setup Excellence</h2>
          <p className="">
            We guide you and answer questions about ballot design, scheduling
            and notice details to meet your bylaws, help you reach quorum and
            ensure your voters rave about the experience.
          </p>
        </div>
        <div className="bg-blue-900   rounded-md  p-4 hover:bg-blue-800">
          <h2 className="text-center text-2xl font-bold">Broad Experience</h2>
          <p className="">
            We advise you on voting best practices so that your vote complies
            with standards for your location, your industry and the specifics of
            the election or meeting you are running.
          </p>
        </div>
        <div className="bg-blue-900  rounded-md p-4 hover:bg-blue-800">
          <h2 className="text-center text-2xl font-bold">Expert Review</h2>
          <p className="">
            You only get one chance to have a great vote the first time, so
            after you complete setup and testing, an Expert reviews your
            settings so you are prepared to host a perfect, flawless vote
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
