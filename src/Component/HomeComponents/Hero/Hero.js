"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";

const Hero = () => {
  return (
    <div className="px-4 md:pt-18 pt-14">
      <div className="relative max-w-7xl mx-auto rounded-b-md shadow-xl overflow-hidden bg-indigo-50 dark:bg-gray-900">
        <div className="dark:hidden dark:sm:block absolute inset-0">
          <Image
            className="h-full w-full object-cover"
            src="https://i.postimg.cc/sxgtjJGh/voting1.jpg"
            alt="banner Image"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-400 mix-blend-multiply"></div>
        </div>
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:pt-28  lg:px-8 lg:pb-28">
          <motion.h1
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              x: { type: "spring", stiffness: 60 },
              opacity: { duration: 1 },
              ease: "easeIn",
              duration: 1,
            }}
            className="text-center sm:text-left text-5xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl sm:ml-12"
          >
            <span className="block text-white/90">
              Democracy is a design
              <span className="block text-indigo-200/70">
                <TypewriterComponent
                  options={{
                    strings: ["Create Election.", "Create Poll."],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </span>
          </motion.h1>
          <p className="mt-6 max-w-sm mx-auto sm:ml-12 text-center sm:text-left text-lg sm:text-xl text-indigo-200/70 sm:max-w-2xl">
            Elections should work for everyone. We are here to make that happen.
            Create a poll - and get answers in no time.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-begin">
            <div className="sm:ml-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/createpoll"
                className="flex items-center justify-center rounded-md border border-transparent bg-white/90 px-4 py-3 text-base font-medium text-indigo-500 shadow-sm hover:bg-indigo-50 sm:px-8"
              >
                Create a poll
              </Link>
              <Link
                href="/poll-participate/favoritelanguage"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-400 bg-opacity-60 px-4 py-3 text-base font-medium text-white/90 shadow-sm hover:bg-opacity-70 sm:px-8"
              >
                View examples
              </Link>
            </div>
          </div>
          <div className="hidden sm:block ml-12 text-sm mt-4 text-indigo-200">
            Signup Required
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
