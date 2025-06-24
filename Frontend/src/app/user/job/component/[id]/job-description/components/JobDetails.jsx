"use client";
import { CircleCheck } from "lucide-react";

export const JobDetails = ({ job }) => {
  const responsibilities = [
    "Develop and implement strategies to achieve company goals",
    "Collaborate with cross-functional teams to deliver projects",
    "Monitor and report on performance metrics",
    job.category === "Technology" &&
      "Write clean, maintainable, and efficient code",
  ].filter(Boolean);

  const whoYouAre = [
    "You have excellent communication and collaboration skills",
    `You're passionate about ${job.category.toLowerCase()}`,
    "You're a problem solver with a growth mindset",
  ];

  const niceToHaves = [
    "Experience with related tools and technologies",
    job.category === "Technology"
      ? "Open source contributions"
      : "Published work in the field",
  ];

  return (
    <div className="flex-1">
      <section className="mb-8">
        <h2 className="font-epilogue font-[600] text-xl sm:text-2xl leading-[120%] text-[#25324B] mb-4">
          Description
        </h2>
        <p className="font-epilogue font-[400] text-sm sm:text-base leading-[160%] text-[#515B6F] mb-6">
          We are looking for a talented {job.title} to join our team at{" "}
          {job.company}. This is a {job.type.toLowerCase()} position based in{" "}
          {job.location.split(",")[0]}.
          {job.level &&
            ` This is an ${job.level.toLowerCase()} level position.`}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-epilogue font-[600] text-xl sm:text-2xl leading-[120%] text-[#25324B] mb-4">
          Responsibilities
        </h2>
        <ul className="space-y-3">
          {responsibilities.map((item, index) => (
            <li
              key={index}
              className="flex items-start sm:items-center gap-2 font-epilogue font-[400] text-sm sm:text-base leading-[160%] text-[#515B6F]"
            >
              <CircleCheck
                size={20}
                color="#56CDAD"
                className="flex-shrink-0 mt-1 sm:mt-0"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-epilogue font-[600] text-xl sm:text-2xl leading-[120%] text-[#25324B] mb-4">
          Who You Are
        </h2>
        <ul className="space-y-3">
          {whoYouAre.map((item, index) => (
            <li
              key={index}
              className="flex items-start sm:items-center gap-2 font-epilogue font-[400] text-sm sm:text-base leading-[160%] text-[#515B6F]"
            >
              <CircleCheck
                size={20}
                color="#56CDAD"
                className="flex-shrink-0 mt-1 sm:mt-0"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-epilogue font-[600] text-xl sm:text-2xl leading-[120%] text-[#25324B] mb-4">
          Nice-To-Haves
        </h2>
        <ul className="space-y-3">
          {niceToHaves.map((item, index) => (
            <li
              key={index}
              className="flex items-start sm:items-center gap-2 font-epilogue font-[400] text-sm sm:text-base leading-[160%] text-[#515B6F]"
            >
              <CircleCheck
                size={20}
                color="#56CDAD"
                className="flex-shrink-0 mt-1 sm:mt-0"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};