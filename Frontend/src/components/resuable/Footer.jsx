"use client";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const handleSubmit = () => console.log("submitted");
  const sections = [
    {
      title: "About",
      links: ["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"],
    },
    {
      title: "Resources",
      links: ["Help Docs", "Guide", "Updates", "Contact Us"],
    },
  ];

  const socialIcons = [
    { icon: <FaFacebook size={16} />, link: "#" },
    { icon: <FaInstagram size={16} />, link: "#" },
    { icon: <FaTwitter size={16} />, link: "#" },
    { icon: <FaLinkedin size={16} />, link: "#" },
  ];

  return (
    <footer className="bg-[#202430] text-white px-6 md:px-16 py-12 mt-12">
      <div className="container grid lg:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
        <div>
          <Link href="/">
            <Image
              src="/home/Header/logo.png"
              width={160}
              height={36}
              alt="Logo"
              className="w-32 sm:w-40 md:w-48 lg:w-40 filter brightness-0 invert"
            />
          </Link>
          <p className="font-epilogue font-[400] text-base leading-[160%] text-[#D6DDEB] pt-4">
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>

        {sections.map((section, idx) => (
          <div key={idx}>
            <h4 className="font-epilogue font-[600] text-lg leading-[160%] text-[#FFFFFF]">
              {section.title}
            </h4>
            <ul className="space-y-3 font-epilogue font-[400] text-base leading-[160%] text-[#D6DDEB]">
              {section.links.map((link, i) => (
                <li key={i} className="hover:text-white cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-epilogue font-[600] text-lg leading-[160%] text-[#FFFFFF] pb-3">
            Get job notifications
          </h4>
          <p className="font-epilogue font-[400] text-base leading-[160%] text-[#D6DDEB] mb-4">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="p-2 font-epilogue font-[400] text-base leading-[160%] text-[#A8ADB7]"
            />
            <button
              onClick={() => handleSubmit()}
              className="bg-[#4640DE] hover:scale-[1.03] transition-all duration-300 ease-in-out text-white px-4 rounded-r text-sm"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 font-epilogue font-[500] text-base leading-[160%] text-[#FFFFFF]">
        <span>2025 © JobMania. All rights reserved.</span>
        <div className="flex gap-4 mt-4 md:mt-0">
          {socialIcons.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-white hover:text-black"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
