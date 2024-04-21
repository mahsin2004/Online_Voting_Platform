/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import dreamWarrior from "../../../../public/images/EVS.jpg";

const About = () => {
  return (
    <div className="py-12 max-w-7xl mx-auto md:pt-28 ">
      <div className="text-white">
        <div href="/" className="flex">
          <Link href="/" className="hover:opacity-80">
            <MdHome className="text-2xl" />
          </Link>
          <Link href="/about">
            <span className="px-7">/</span>
            <button className="hover:opacity-75">About Us</button>
          </Link>
        </div>
      </div>

      <div className="max-w-[780px] my-6 bg-[#1F2937] text-white mx-auto py-9 px-7  rounded-lg">
        <h1 className="text-2xl font-semibold">About Us</h1>
        <div className="my-8">
          <p className="opacity-75">
            An online voting system is a software platform that allows groups to securely conduct votes and elections.The system should verify the identity and eligibility of the voters and candidate, and prevent unauthorized or duplicate voting.
          </p>
          <br />
        </div>
        <div className="my-20">
          <h1 className="text-2xl font-semibold">Our Team</h1>
          {/* <div className="avatar my-8">
            <div className="w-48 rounded-full">
              <Image
                width={100}
                height={100}
                alt="Team CEO"
                src={dreamWarrior}
              />
            </div>
          </div>
          <h1 className="text-xl font-semibold opacity-85">Dream Warrior</h1>
          <h1 className="text-base opacity-50 py-0.5">Founder & CEO</h1> */}

          <div className="text-white">
            <div className=" my-4 flex justify-center items-center">
              <div className="flex flex-col gap-2 justify-center items-center">
                <a
                  className="flex flex-col justify-center items-center hover:text-blue-500"
                  target="_blank"
                  href="https://anamul-portfolio.surge.sh/"
                >
                  <div className="w-32 rounded-full">
                    <Image
                      width={300}
                      height={300}
                      alt="Tea"
                      className="rounded-full"
                      src="https://i.ibb.co/161dhbQ/Anamul.jpg"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="font-semibold">
                      Anamul Haque{" "}
                      <span className="text-gray-400">[Leader]</span>
                    </h2>
                    <h2 className="text-sm text-gray-400">
                      MERN stack engineer
                    </h2>
                  </div>
                </a>
              </div>
            </div>

            <div className=" my-4 flex justify-around items-center">
              <div className="flex flex-col gap-2 justify-center items-center">
                <a
                  className="flex flex-col justify-center items-center hover:text-blue-500"
                  target="_blank"
                  href="https://my-portfolio-site-1.web.app/"
                >
                  <div className="w-32 rounded-full">
                    <Image
                      width={300}
                      height={300}
                      alt=""
                      className="rounded-full"
                      src="https://i.ibb.co/N6CNRNL/md-mahsin-mia2-1.jpg"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="font-semibold">Md Mahsin Mia</h2>
                    <h2 className="text-sm text-gray-400">
                      MERN stack engineer
                    </h2>
                  </div>
                </a>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                <a
                  className="flex flex-col justify-center items-center hover:text-blue-500"
                  target="_blank"
                  href="https://junayet73.netlify.app/"
                >
                  <div className="w-32 rounded-full">
                    <Image
                      width={300}
                      height={300}
                      alt="Team CEO"
                      className="rounded-full"
                      src="https://i.ibb.co/pRzNz09/1708497619001.jpg"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="font-semibold">Junayet Shiblu</h2>
                    <h2 className="text-sm text-gray-400">
                      MERN stack engineer
                    </h2>
                  </div>
                </a>
              </div>
            </div>

            <div className=" my-4 flex justify-between items-center px-5">
              <div className="flex flex-col gap-2 justify-center items-center">
                <a
                  className="flex flex-col justify-center items-center hover:text-blue-500"
                  target="_blank"
                  href="https://chandon.netlify.app/"
                >
                  <div className="w-32 rounded-full">
                    <Image
                      width={300}
                      height={300}
                      alt="Team CEO"
                      className="rounded-full"
                      src="https://i.postimg.cc/2y7gZRp9/chandon-kumar.png"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="font-semibold">Chandon Kumar</h2>
                    <h2 className="text-sm text-gray-400">
                      MERN stack engineer
                    </h2>
                  </div>
                </a>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                <a
                  className="flex flex-col justify-center items-center hover:text-blue-500"
                  target="_blank"
                  href="https://personal-portfolio-49577.web.app/"
                >
                  <div className="w-32 rounded-full">
                    <Image
                      width={300}
                      height={300}
                      alt="Team CEO"
                      className="rounded-full"
                      src="https://i.ibb.co/Zg03hVq/1704042718127.jpg"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="font-semibold">MD. Jahangir Alam</h2>
                    <h2 className="text-sm text-gray-400">
                      MERN stack engineer
                    </h2>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="my-8">
          <h1 className="text-2xl font-semibold">General Information</h1>
          <div className="my-6">
            <p className="">
              <span className="opacity-75">
                DVS offers its users a free platform where they can create
                different types of polls. which can be used to easily find the majority in a group with
                different opinions. A simple question with a selection of
                predefined answer options can be shared with the group in no
                time. Already in the days of Usenet (since 1979) the name
                Poll was coined as a synonym for this kind of voting. We do our
                best to live up to this and at the same time fight any kind of
                manipulation in voting with different methods
              </span>
              <strong className="underline px-1">(more on this below)</strong>.
              <span className="opacity-75">
                However, we cannot guarantee that we will fully succeed in doing
                so.
              </span>
            </p>
          </div>
        </div>
       
        <div className="my-8">
          <h1 className="text-2xl font-semibold">Technologies we use</h1>
          <div className="my-6">
            <p className="opacity-75">
              Our tech stack is quite simple. We are JavaScript fans and always
              interested in the latest web standards and technologies.
            </p>

            <ul className="my-6">
              <li>Expertise: HTML, CSS</li>
              <li>
                Comfortable: React.js, Next.js, TailwindCSS, Material UI, Daisy
                UI
              </li>
              <li>Familiar: JavaScript, Express.js, MongoDB, Redux Toolkit</li>
              <li>Tools: VS-Code, Git, GitHub, Firebase, Vercel </li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-semibold">Interested in Tech?</h1>
          <ul className="my-2">
            <li>Veu.js</li>
            <li>UI/UX Design</li>
            <li>Responsive Design</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
