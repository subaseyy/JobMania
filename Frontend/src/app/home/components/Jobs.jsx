import Image from "next/image";
import React from "react";

const Jobs = () => {
  return (
    <div className="container my-12">
      <div className="bg-[#4640DE] grid grid-cols-1 lg:grid-cols-2 relative">
        <div className="absolute bottom-0 right-0 hidden lg:flex">
          <Image src="/hero/ractangle.png" width={200} height={716} alt="" />
        </div>
        <div className="absolute -top-1 -left-1 hidden lg:flex rotate-180">
          <Image src="/hero/ractangle.png" width={200} height={716} alt="" />
        </div>
        <div className="flex flex-col justify-center p-6 lg:p-0 lg:pl-14">
          <p className="font-clash font-[600] text-5xl leading-[110%] max-w-[364px] text-white">
            Start posting jobs today
          </p>
          <p className="font-epilogue font-[500] text-base leading-[160%] text-white py-4 lg:py-8">
            Start posting jobs for only $10.
          </p>
          <div>
            <button className="font-epilogue font-[700] text-base leading-[160%] text-[#4640DE] py-3.5 px-5 bg-white">
              Sign Up For Free
            </button>
          </div>
        </div>
        <div className="pt-20 z-[2] hidden lg:flex">
          <Image src="/jobs/jobs.png" width={664} height={344} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
