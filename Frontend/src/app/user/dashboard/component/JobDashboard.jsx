import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileChartColumnIncreasing,
  MessageCircle,
  MessageCircleX,
} from "lucide-react";
import { format, subDays, addDays } from "date-fns";
import Image from "next/image";

export default function JobDashboard({
  currentDate,
  setCurrentDate,
  dateRange,
}) {
  const upcomingInterviews = [
    {
      time: "10:00 AM",
      interviewer: "",
      position: "",
      avatar: "/api/placeholder/40/40",
    },
    {
      time: "10:30 AM",
      interviewer: "Joe Bartmann",
      position: "HR Manager at Divvy",
      avatar: "/api/placeholder/40/40",
    },
    {
      time: "11:00 AM",
      interviewer: "",
      position: "",
      avatar: "/api/placeholder/40/40",
    },
  ];

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Jobs Applied */}
        <div className="grid gap-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border relative overflow-hidden">
            <h3 className="font-epilogue font-[600] text-xl leading-[120%] text-[#25324B] mb-6">
              Total Jobs Applied
              {/* ({format(dateRange[0].startDate, "MMM d")} -{" "}
              {format(dateRange[0].endDate, "MMM d")}) */}
            </h3>
            <div className="flex items-center">
              <span className="font-epilogue font-[600] text-7xl leading-[100%] text-[#25324B]">
                45
              </span>
              <div className="absolute -bottom-3 right-10 ">
                <FileChartColumnIncreasing color="#515B6F" size={72} />
              </div>
            </div>
          </div>

          {/* Interviewed */}
          <div className="bg-white rounded-lg p-6 shadow-sm border relative overflow-hidden">
            <h3 className="font-epilogue font-[600] text-xl leading-[120%] text-[#25324B] mb-6">
              Interviewed
              {/* ({format(dateRange[0].startDate, "MMM d")} -{" "}
              {format(dateRange[0].endDate, "MMM d")}) */}
            </h3>
            <div className="flex items-center">
              <span className="font-epilogue font-[600] text-7xl leading-[100%] text-[#25324B]">
                18
              </span>
              <div className="absolute bottom-0 right-10">
                <Image
                  src="icon.svg"
                  alt="Interviewed Icon"
                  width={110}
                  height={150}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Applied Status */}
        <div className="bg-white rounded-lg p-6 shadow-sm border flex flex-col justify-between">
          <h3 className="font-epilogue font-[600] text-xl leading-[120%] text-[#25324B] mb-6">
            Jobs Applied Status
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className=" flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(#4640DE 0% 60%, #E9EBFD 60% 100%)`,
                  }}
                ></div>
                <div className="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="sm:ml-4 pt-6">
              <div className="flex items-center mb-2">
                <div className="h-5 w-5 bg-[#4640DE] mr-2 rounded-md" />
                <div className="flex flex-col ml-2">
                  <span className="font-epilogue font-[700] text-lg leading-[100%] text-[#25324B]">
                    60%
                  </span>
                  <span className="font-epilogue font-[400] text-base leading-[160%] text-[#7C8493]">
                    Unsuitable
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 bg-[#E9EBFD] mr-2 rounded-md" />
                <div className="flex flex-col ml-2">
                  <span className="font-epilogue font-[700] text-lg leading-[100%] text-[#25324B]">
                    40%
                  </span>
                  <span className="font-epilogue font-[400] text-base leading-[160%] text-[#7C8493]">
                    Interviewed
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex ">
            <button className="flex items-center font-epilogue font-[600] text-base leading-[160%] text-[#4640DE]">
              View All Applications
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white rounded-lg p-6 shadow-sm border ">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-epilogue font-[600] text-xl leading-[160%] text-[#202430]">
              Upcoming Interviews
            </h3>
          </div>
          <div className="h-[1px] w-full bg-[#D6DDEB]" />
          <div className="flex items-center justify-between py-6">
            <span className="font-epilogue font-[600] text-xl leading-[120%] text-[#202430] mr-4">
              Today,{" "}
              <span className="font-[400]">
                {format(currentDate, "d MMMM")}
              </span>
            </span>

            <div className="flex space-x-1">
              <button
                aria-label="Previous Day"
                onClick={() => setCurrentDate(subDays(currentDate, 1))}
                className="p-1 rounded hover:bg-gray-100"
              >
                <ChevronLeft size={18} className="text-gray-600" />
              </button>
              <button
                aria-label="Next Day"
                onClick={() => setCurrentDate(addDays(currentDate, 1))}
                className="p-1 rounded hover:bg-gray-100"
              >
                <ChevronRight size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="space-y-0">
            {upcomingInterviews.map((interview, index) => (
              <div
                key={index}
                className="flex items-center py-3 border-t border-[#D6DDEB]"
              >
                <div className="w-1/5 font-epilogue font-[500] text-base leading-[120%] text-[#7C8493]">
                  {interview.time}
                </div>
                {interview.interviewer ? (
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-blue-500 mr-3">
                      <Image
                        width={40}
                        height={40}
                        src={interview.avatar}
                        alt={interview.interviewer || "Interviewer Avatar"}
                      />
                    </div>
                    <div>
                      <div className="font-epilogue font-[600] text-base leading-[120%] text-[#25324B]">
                        {interview.interviewer}
                      </div>
                      <div className="font-epilogue font-[500] text-base leading-[160%] text-[#7C8493]">
                        {interview.position}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 italic ml-2 mr-4">
                    No interview scheduled
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
