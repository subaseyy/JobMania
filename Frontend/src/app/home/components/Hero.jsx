"use client";
import { MapPin, Search } from "lucide-react";
import Image from "next/image";
// import { useEffect, useState } from "react";

const Hero = () => {
  // const [username, setUsername] = useState("");

  // useEffect(() => {
  //   const getUsernameFromCookie = () => {
  //     const match = document.cookie
  //       .split("; ")
  //       .find((row) => row.startsWith("username="));
  //     if (match) {
  //       const value = match.split("=")[1];
  //       setUsername(decodeURIComponent(value));
  //     }
  //   };
  //   getUsernameFromCookie();
  // }, []);
  const handleSubmit = () => {
    console.log("clicked");
  };
  return (
    <div className="bg-[#f9f9fd] relative">
      <div className="container px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="">
          <h1 className="font-clash font-[600] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[110%] max-w-[480px]">
            Discover more than{" "}
            <span className="text-[#26A4FF]">
              5000+ Jobs
              <div className="pt-1">
                <Image
                  src="/home/Hero/underline.svg"
                  alt="underline"
                  width={455}
                  height={39}
                  className="object-contain w-full max-w-[455px]"
                />
              </div>
            </span>
          </h1>
          <p className="font-epilogue font-[400] text-base sm:text-lg md:text-xl leading-[160%] text-[#515B6F] max-w-[500px] pt-2">
            Great platform for the job seekers that searching for new career
            heights and passionate about startups.
          </p>
          {/* {username && (
            <p className="font-epilogue text-[#202430] pt-2">
              Welcome back, <span className="font-semibold">{username}</span>!
            </p>
          )} */}

          <div className="mt-8 flex flex-col justify-between md:flex-row items-stretch md:items-center gap-4 md:gap-8 bg-white rounded-lg shadow-md p-4 w-full max-w-3xl">
            <div className="flex justify-center items-center gap-4 w-full md:w-1/3 border-b border-[#D6DDEB]">
              <Search className="min-w-4" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="font-epilogue font-[400] text-base leading-[160%] text-[#7C8493] p-1 w-full"
              />
            </div>
            <div className="flex justify-center items-center gap-4 w-full md:w-1/3 border-b border-[#D6DDEB]">
              <MapPin className="min-w-4" />
              <select className="cursor-pointer font-epilogue font-[400] text-base leading-[160%] text-[#25324B] p-1 w-full">
                <option>Kathmandu</option>
                <option>Bhaktapur</option>
                <option>Lalitpur</option>
              </select>
            </div>

            <button
              onClick={() => handleSubmit()}
              className="bg-[#4640DE] hover:scale-[1.03] transition-all duration-300 ease-in-out text-white font-epilogue font-[700] text-base md:text-lg leading-[160%] px-4 md:px-6 py-3 md:py-3 w-full md:w-1/3"
            >
              Search my job
            </button>
          </div>

          <div className="font-epilogue font-[500] text-sm sm:text-base leading-[160%] text-[#202430] pt-4">
            <span className="font-[400]"> Popular:</span> UI Designer, UX
            Researcher, Android, Admin
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden lg:flex">
        <Image src="/home/hero/ractangle.png" width={483} height={716} alt="" />
      </div>
    </div>
  );
};

export default Hero;
