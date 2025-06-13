"use client";

import Image from "next/image";
import "./Logo.css";

const logos = [
  { name: "Vodafone", src: "/home/logos/vodafone.png" },
  { name: "Intel", src: "/home/logos/intel.png" },
  { name: "Tesla", src: "/home/logos/tesla.png" },
  { name: "AMD", src: "/home/logos/AMD.png" },
  { name: "Talkkit", src: "/home/logos/talkkit.png" },
  { name: "Vodafone", src: "/home/logos/vodafone.png" },
  { name: "Intel", src: "/home/logos/intel.png" },
  { name: "Tesla", src: "/home/logos/tesla.png" },
  { name: "AMD", src: "/home/logos/AMD.png" },
  { name: "Talkkit", src: "/home/logos/talkkit.png" },
];

const Logo = () => (
  <div className="py-12 bg-white">
    <p className="container font-epilogue font-[400] text-lg leading-[160%] text-[#202430] pb-4">
      Companies we helped grow
    </p>
    <div className="overflow-hidden">
      <div className="flex animate-marquee space-x-40 min-w-fit">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 grayscale hover:grayscale-0 transition duration-300 ease-in-out hover:cursor-pointer"
            style={{ width: 100, height: 100 }}
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={100}
              height={100}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Logo;
