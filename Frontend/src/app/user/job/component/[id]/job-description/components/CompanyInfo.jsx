"use client";
import Image from "next/image";

export const CompanyInfo = ({ job }) => {
  return (
    <section className="p-6 flex flex-col md:flex-row items-start gap-6">
      <div className="flex-1">
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src={job.icon || "/logo.png"}
            alt="Company Logo"
            width={48}
            height={48}
            className="rounded-md"
          />
          <div>
            <h3 className="font-epilogue font-semibold text-[32px] text-[#25324B] leading-7">
              {job.company}
            </h3>
            <a
              href="#"
              className="font-epilogue font-[600] text-sm sm:text-base text-[#4640DE] leading-[160%]"
            >
              Read more about {job.company} →
            </a>
          </div>
        </div>
        <p className="font-epilogue font-[400] text-base text-[#515B6F] leading-[160%]">
          {job.company} is a technology company that builds economic
          infrastructure for the internet. Businesses of every size—from new
          startups to public companies—use our software to accept payments and
          manage their businesses online.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full md:w-1/2">
        {[
          {
            src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=120&fit=crop",
            alt: "Office",
          },
          {
            src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=120&fit=crop",
            alt: "Team",
          },
          {
            src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=200&h=120&fit=crop",
            alt: "Workspace",
          },
        ].map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="w-full h-24 object-cover rounded-md"
          />
        ))}
      </div>
    </section>
  );
};
