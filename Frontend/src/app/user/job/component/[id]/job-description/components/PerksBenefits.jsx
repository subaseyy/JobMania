"use client";
import {
  Stethoscope,
  Umbrella,
  Video,
  Mountain,
  Coffee,
  Train,
  HeartHandshake,
  Calendar,
  Handshake,
} from "lucide-react";

const iconMap = {
  Stethoscope: Stethoscope,
  Umbrella: Umbrella,
  Coffee: Coffee,
  Mountain: Mountain,
  Video: Video,
  HeartHandshake: HeartHandshake,
  Calendar: Calendar,
  Handshake: Handshake,
};

const perksData = [
  {
    title: "Full Healthcare",
    description:
      "We believe in thriving communities and that starts with our team being happy and healthy.",
    icon: "Stethoscope",
  },
  {
    title: "Unlimited Vacation",
    description:
      "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
    icon: "Umbrella",
  },
  {
    title: "Remote Working",
    description:
      "You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.",
    icon: "Coffee",
  },
  {
    title: "Commuter Benefits",
    description:
      "We’re grateful for all the time and energy each team member puts into getting to work every day.",
    icon: "Mountain",
  },
  {
    title: "Skill Development",
    description:
      "We believe in always learning and leveling up our skills. Whether it’s a conference or online course.",
    icon: "Video  ",
  },
  {
    title: "We give back.",
    description:
      "We anonymously match any donation our employees make (up to $/€ 600) so they can support the organizations they care about most–times two.",
    icon: "Handshake",
  },
  {
    title: "Team Summits",
    description:
      "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.",
    icon: "Calendar",
  },
];

export const PerksBenefits = () => {
  return (
    <section className="mb-12">
      <h2 className="mb-6">
        <p className="font-epilogue font-semibold text-[32px] text-[#25324B] mb-2">
          Perks & Benefits
        </p>
        <p className="font-epilogue font-normal text-base text-[#515B6F]">
          This job comes with several perks and benefits
        </p>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {perksData.map((perk, index) => {
          const Icon = iconMap[perk.icon];
          return (
            <div key={index} className="p-4">
              {Icon && <Icon className="mb-6 h-10 w-10 text-[#4640DE]" />}
              <h3 className="font-clash font-[600] text-xl leading-[120%] text-[#25324B] mb-1">
                {perk.title}
              </h3>
              <p className="font-epilogue font-normal text-base text-[#515B6F]">
                {perk.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
